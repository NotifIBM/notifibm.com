/* eslint-disable comma-dangle */
import { NextResponse } from 'next/server';
import calculateGPA from '../../../lib/calculateGPA';
import { redis } from '../../../lib/redis';

function convertToGradePoint(grade) {
  switch (grade) {
    case 'A+':
      return 4.0;
    case 'A':
      return 4.0;
    case 'A-':
      return 3.7;
    case 'B+':
      return 3.3;
    case 'B':
      return 3.0;
    case 'B-':
      return 2.7;
    case 'C+':
      return 2.3;
    case 'C':
      return 2.0;
    case 'C-':
      return 1.7;
    case 'D+':
      return 1.3;
    case 'D':
      return 1.0;
    case 'E':
      return 0.0;
    default:
      return 0.0;
  }
}

function getTableRows(html) {
  // console.log(html);
  const rows = [];
  const gradePoints = [];

  // use a regular expression to find the rows of the table
  const regex = /<tr[^>]*>(.|\n)*?<\/tr>/g;
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(html)) !== null) {
    rows.push(match[0]);
  }
  if (rows.length < 3) {
    return null;
  }

  // eslint-disable-next-line no-plusplus
  for (let index = 3; index < rows.length; index++) {
    const row = rows[index];
    const tdElements = row.match(/<td[^>]*>(.|\n)*?<\/td>/g);

    let Id;
    let Subject;
    let Special;
    let ExamDate;
    let CW;
    let Exam;
    let FinalGrade;
    let Points;

    if (tdElements == null) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (tdElements.length < 5) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (tdElements) {
      // eslint-disable-next-line no-unused-vars, operator-linebreak
      [Id, Subject, Special, ExamDate, CW, Exam, FinalGrade, Points] =
        tdElements.map((td) => td.replace(/<[^>]*>/g, ''));
    }

    Subject = Subject.split('/')[Subject.split('/').length - 1];
    let Repeat = false;
    if (convertToGradePoint(CW) < 2.0 || convertToGradePoint(Exam) < 2.0 || convertToGradePoint(FinalGrade) < 2.0) {
      if (convertToGradePoint(Exam) !== convertToGradePoint(FinalGrade)) {
        Repeat = true;
      } else if (convertToGradePoint(CW) !== 0) {
        Repeat = true;
      } else if (FinalGrade.toUpperCase() === 'X') {
        Repeat = true;
      } else if (FinalGrade.toUpperCase() === 'E') {
        Repeat = true;
      }
    }
    gradePoints.push({ Id, Subject, ExamDate, CW, Exam, FinalGrade, Points, Repeat });
  }

  return gradePoints;
}

export default async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
  // const { studentID } = req.body;
  const body = await req.json();
  const { studentID, program } = body;
  // console.log(studentID);

  const cachedData = await redis.get(studentID);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  const formData = new URLSearchParams({
    'F[Programme]': 14,
    'F[Batch]': 6509,
    'F[Student]': studentID,
  }).toString();

  try {
    const response = await fetch('https://www.nibmworldwide.com/exams/mis', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(
        // eslint-disable-next-line comma-dangle
        `Failed to fetch data from server: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();

    const courses = getTableRows(html);

    if (!courses || courses.length === 0) {
      // throw new Error('No data found');
      console.log('No data found');
      return NextResponse.json({ gpa: 0, courses: [] });
    }

    const { gpa, gpaNonRepeat } = await calculateGPA(courses, parseInt(program, 10));
    const data = JSON.stringify({ gpa, gpaNonRepeat, courses });
    await redis.set(studentID, data, { ex: 1200 });
    return NextResponse.json({ gpa, gpaNonRepeat, courses });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: error.message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
