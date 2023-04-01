'use client';

import { useState } from 'react';
import { TitleText } from '../../components';

export default function Page() {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [gpa, setGPA] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // calculate GPA based on selected options and set it with setGPA()
    // ...
  };

  return (
    <div className="container mx-auto my-8 relative z-10 text-center">
      <TitleText title={<>GPA Calculator</>} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-8 text-center my-auto mx-auto px-5"
      >
        <label htmlFor="option1" className="font-bold text-gray-300">
          Program:
        </label>
        <select
          id="option1"
          className="p-2 border border-gray-400 rounded-md"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        >
          <option value="">Please select Program</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <label htmlFor="option2" className="font-bold  text-gray-300">
          Batch:
        </label>
        <select
          id="option2"
          className="p-2 border border-gray-400 rounded-md"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        >
          <option value="">Please select Index</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <label htmlFor="option3" className="font-bold  text-gray-300">
          Index:
        </label>
        <select
          id="option3"
          className="p-2 border border-gray-400 rounded-md"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        >
          <option value="">Please select Index</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Calculate GPA
        </button>
      </form>

      {gpa !== null && <p className="mt-4">GPA: {gpa.toFixed(2)}</p>}
    </div>
  );
}
