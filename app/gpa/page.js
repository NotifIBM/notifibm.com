'use client';

import { useState, useEffect } from 'react';
import { TitleText } from '../../components';

const Page = () => {
  const [program, setProgram] = useState('');
  const [programList, setProgramList] = useState([]);
  const [batch, setBatch] = useState('');
  const [batchList, setBatchList] = useState([]);
  const [index, setIndex] = useState('');
  const [indexList, setIndexList] = useState([]);
  const [loading, setLoading] = useState(false); // add loading state
  const [dataFetch, setDataFetch] = useState(false);
  const [gpa, setGPA] = useState(null);
  const [courses, setCourses] = useState([null]);

  // Fetch program list
  useEffect(() => {
    fetch('/api/gpa/programs')
      .then((response) => response.json())
      .then((data) => {
        const newProgramList = data.map((Program) => ({
          value: Program.web_value,
          label: Program.name,
        }));
        setProgramList(newProgramList);
      });
  }, []);

  // Fetch batch list
  useEffect(() => {
    if (program) {
      setDataFetch(true);
      fetch('/api/gpa/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ program }),
      })
        .then((response) => response.json())
        .then((data) => {
          setBatchList(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setDataFetch(false));
    }
  }, [program]);

  // Fetch index list
  useEffect(() => {
    if (batch) {
      setDataFetch(true);
      fetch('/api/gpa/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batch }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIndexList(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setDataFetch(false));
    }
  }, [batch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGPA(null);
    setLoading(true); // set loading to true

    try {
      const response = await fetch('/api/gpa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentID: index,
          program,
        }),
      });

      const data = await response.json();
      setGPA(parseFloat(data.gpa));
      setCourses(data.courses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // set loading to false
    }
  };

  return (
    <div className="container mx-auto my-8 relative z-10 text-center flex flex-col md:flex-row md:flex-wrap pb-12">
      <div className="m-4 p-5 text-center mx-auto">
        <TitleText title={<>GPA Calculator</>} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-5 text-center my-auto mx-auto px-1 mt-2 md:mt-8"
      >
        <label htmlFor="program" className="font-bold text-gray-300">
          Program:
        </label>
        <select
          id="program"
          className="p-0.5 border border-gray-400 rounded-md text-sm w-48 h-8"
          value={program}
          onChange={(e) => {
            setProgram(e.target.value);
          }}
        >
          <option value="" className="text-sm">Please select Batch</option>
          {programList && programList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <label htmlFor="batch" className="font-bold  text-gray-300">
          Batch:
        </label>
        <select
          id="batch"
          className="p-0.5 border border-gray-400 rounded-md text-sm w-48 h-8"
          value={batch}
          onChange={(e) => {
            setBatch(e.target.value);
          }}
          disabled={dataFetch}
        >
          <option value="">Please select Batch</option>
          {batchList
            && batchList.map((Batch) => (
              <option key={Batch.value} value={Batch.value}>
                {Batch.name}
              </option>
            ))}
        </select>
        {/* INDEX SELECT */}
        <label htmlFor="index" className="font-bold  text-gray-300">
          Index:
        </label>
        <select
          id="index"
          className="p-0.5 border border-gray-400 rounded-md text-sm w-48 h-8"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          disabled={dataFetch}
        >
          <option value="">Please select Index</option>
          {indexList && indexList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md"
          onClick={handleSubmit}
        >
          Calculate GPA
        </button>
      </form>

      {loading && (
        <>
          <br />
          <div className="mt-8 mx-auto">
            <p className="text-lg md:text-3xl font-bold mb-2">GPA:</p>
            <p className="text-3xl md:text-8xl font-bold text-green-500">Loading...</p>
          </div>
        </>
      )}

      {gpa !== null && (
        <div className="w-full justify-center items-center">
          <div className="mt-8 text-center">
            <p className="text-lg md:text-3xl font-bold mb-2">GPA:</p>
            <p className="text-3xl md:text-8xl font-bold text-green-500 mx-4 px-5">{gpa === 'NaN' ? 0.00 : gpa.toFixed(2)}</p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl md:text-3xl font-bold mb-2">Modules:</p>
            <div className="my-auto mx-auto px-1 mt-2 md:mt-8">
              <table className="table-auto mx-auto">
                <thead>
                  <tr>
                    <th className="text-sm md:text-xl underline font-bold text-white px-2">Subject</th>
                    <th className="text-sm md:text-xl underline font-bold text-white px-2">Final Grade</th>
                    <th className="text-sm md:text-xl underline font-bold text-white px-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {courses && courses.map((course) => (
                    <tr key={course.Subject}>
                      <td className="text-sm md:text-xl font-bold text-secondary-white px-2">{course.Subject}</td>
                      <td className="text-sm md:text-xl font-bold text-secondary-white px-2">{course.FinalGrade}</td>
                      <td className="text-sm md:text-xl font-bold text-secondary-white px-2">{course.Points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Page;
