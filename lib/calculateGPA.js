import { supabase } from './supabaseClient';

async function calculateGPA(results, program) {
  const credits = {
  };

  const { data, error } = await supabase.from('module_credits').select('id,module,credit').eq('program', program);
  if (error) {
    console.log(error);
  }
  data.forEach((item) => {
    credits[item.module.toLowerCase()] = parseInt(item.credit, 10);
  });

  const grades = {}; // object to store the most recent exam result for each module
  let totalPoints = 0;
  let totalCredits = 0;
  let totalPointsNonRepeat = 0;
  let totalCreditsNonRepeat = 0;

  results.forEach((result) => {
    // check if the current result is the most recent one for the given module
    const subject = result.Subject.trim().toLowerCase();
    if (!grades[subject] || result.ExamDate > grades[subject].ExamDate) {
      grades[subject] = result;
    }
  });

  // iterate over the grades object and calculate the GPA
  Object.keys(grades).forEach((subject) => {
    const grade = grades[subject];
    const credit = credits[subject.trim()];
    // console.log(`Subject : ${subject} & Credit : ${credit}`);

    totalPoints += parseFloat(grade.Points) * credit;
    totalCredits += credit;
    // console.log(`credit : ${credit} & Total Credits : ${totalCredits}`);
  });

  Object.keys(grades).forEach((subject) => {
    const grade = grades[subject];
    const credit = credits[subject.trim()];
    // console.log(`Subject : ${subject} & Credit : ${credit}`);

    if (grade.Repeat === false) {
      totalPointsNonRepeat += parseFloat(grade.Points) * credit;
      totalCreditsNonRepeat += credit;
    }
    // console.log(`credit : ${credit} & Total Credits : ${totalCredits}`);
  });

  const gpa = (totalPoints / totalCredits).toFixed(2);
  const gpaNonRepeat = (totalPointsNonRepeat / totalCreditsNonRepeat).toFixed(2);
  // console.log(`GPA : ${gpa}`);
  // console.log(`GPA Non Repeat : ${gpaNonRepeat}`);
  // console.log(`FINAL Total Points : ${totalPointsNonRepeat} & FINAL Total Credits : ${totalCreditsNonRepeat}`);

  // console.log(`FINAL Total Points : ${totalPoints} & FINAL Total Credits : ${totalCredits}`);
  // calculate and return the GPA
  // return (totalPoints / totalCredits).toFixed(2);
  return {
    gpa,
    gpaNonRepeat,
  };
}

export default calculateGPA;
