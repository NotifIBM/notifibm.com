'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
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
  const [gpa2, setGPA2] = useState(null);
  const [courses, setCourses] = useState([null]);
  const [enabled, setEnabled] = useState(true);

  // Fetch program list
  useEffect(() => {
    fetch('/api/gpa/programs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('failed to fetch programs');
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          toast.error('Check your connection !');
          return;
        }
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
        .catch((error) => {
          console.error(error);
          toast.error('Something went wrong !');
        })
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
        .then((response) => {
          if (!response.ok) {
            throw new Error('failed to fetch index list');
          }
          return response.json();
        })
        .then((data) => {
          setIndexList(data);
        })
        .catch((error) => {
          console.error(error);
          toast.error('Something went wrong !');
        })
        .finally(() => setDataFetch(false));
    }
  }, [batch]);

  const handleSubmit = async (e) => {
    toast.dismiss();
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
      // check status is 429
      if (response.status === 429) {
        // throw new Error('Too Many Requests');
        toast.error('Too Many Requests');
        setLoading(false);
        return;
      }
      // check status is 400
      if (response.status === 400) {
        // throw new Error('Bad Request');
        toast.error('Bad Request');
        setLoading(false);
        return;
      }
      // check status is 404
      if (response.status === 404) {
        // throw new Error('Not Found');
        toast.error('Not Found');
        setLoading(false);
        return;
      }
      if (response.status !== 200 || !data) {
        toast.error('Something went wrong');
        setLoading(false);
        return;
      }
      if (!data.gpa || !data.courses) {
        toast.error('No Data Found');
      }
      if (data.gpa === 'NaN') {
        toast.error('Incompatible Modules Found');
      }
      setGPA(parseFloat(data.gpa));
      setGPA2(parseFloat(data.gpaNonRepeat));
      setCourses(data.courses);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setEnabled(true);
      setLoading(false); // set loading to false
    }
  };

  const Toggle = () => {
    setGPA(gpa2);
    setGPA2(gpa);
    setEnabled(!enabled);
  };

  return (
    <div className="container mx-auto my-8 relative z-10 text-center flex flex-col md:flex-row md:flex-wrap pb-12">
      <div className="flex flex-col md:flex-row md:flex-wrap">
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
            className="p-0.5 border rounded-md text-sm w-48 h-8 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            value={program}
            onChange={(e) => {
              setProgram(e.target.value);
            }}
          >
            <option value="" className="text-sm">Please select Program</option>
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
            className="p-0.5 border rounded-md text-sm w-48 h-8 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
            className="p-0.5 border rounded-md text-sm w-48 h-8 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
            className="px-4 mt-4 md:mt-0 mx-auto py-1 bg-blue-500 text-white font-bold rounded-md flex"
            onClick={handleSubmit}
            disabled={loading}
          >
            {/* Calculate GPA
            {loading && (
              <svg aria-hidden="true" role="status" className="my-auto inline w-4 h-4 ml-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
            )} */}
            {loading ? (
              <>
                Calculating {' '}
                <svg aria-hidden="true" role="status" className="my-auto inline w-4 h-4 ml-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
              </>
            ) : (
              <>
                Calculate GPA
              </>
            )}
          </button>
        </form>
      </div>
      {loading && (
        <>
          <br />
          <div role="status" className="mt-8 mx-auto flex flex-col justify-center text-center">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}

      {/* <div role="status" className="mt-8 mx-auto flex flex-col justify-center text-center">
        <svg aria-hidden="true" className="w-8 h-8 lg:w-12 lg:h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div> */}

      {gpa !== null && (
        <div className="w-full justify-center items-center">
          <div className="mt-8 text-center">
            <p className="text-lg md:text-3xl font-bold mb-2">GPA:</p>
            <p className="text-3xl md:text-8xl font-bold text-white mx-4 px-5">{gpa === 'NaN' ? 0.00 : gpa.toFixed(2)}</p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl md:text-3xl font-bold mb-2">Modules:</p>
            <div className="my-auto mx-auto px-1 mt-2 md:mt-8">
              <table className="table-auto mx-auto">
                <thead>
                  <tr>
                    <th className="text-sm md:text-xl underline font-bold text-white px-2">Subject</th>
                    <th className="text-xs md:text-xl underline font-bold text-white px-2">CW</th>
                    <th className="text-xs md:text-xl underline font-bold text-white px-2">Exam</th>
                    <th className="text-sm md:text-xl underline font-bold text-white px-2">Final Grade</th>
                    <th className="text-xs hidden sm:block md:text-xl underline font-bold text-white px-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {courses && courses.map((course) => (
                    <tr key={course.Id}>
                      <td className="text-sm md:text-xl font-bold text-secondary-white px-2">{course.Subject}{course.Repeat && <span className="text-red-600 font-extrabold whitespace-nowrap">*</span>}</td>
                      <td className="text-xs md:text-xl font-bold text-secondary-white px-2">{course.CW}</td>
                      <td className="text-xs md:text-xl font-bold text-secondary-white px-2">{course.Exam}</td>
                      <td className="text-sm md:text-xl font-bold text-secondary-white px-2">{course.FinalGrade} </td>
                      <td className="text-xs hidden sm:block md:text-xl font-bold text-secondary-white px-2">{course.Points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col gap-3 float-right">
                <p className="text-xs font-semibold hover:font-extrabold text-red-600 mt-2 float-right mr-3 md:mr-12">* Repeated Modules</p>
                <div className="flex">
                  <label className="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={enabled}
                      readOnly
                    />
                    <div
                      onClick={
                        Toggle
                      }
                      className="w-11 h-6 bg-gray-500 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    />
                    <span className="ml-2 text-sm font-medium text-secondary-white">
                      Include Repeated Modules
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Page;
