import React, { useState } from 'react';
import axios from 'axios';

interface Division {
  _id: string;
  name: string;
}

interface Props {
  divisions: Division[];
  onUpdate: () => void;
}

const DivisionList: React.FC<Props> = ({ divisions, onUpdate }) => {
  const [newDivision, setNewDivision] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/divisions', { name: newDivision });
      setNewDivision('');
      onUpdate();
    } catch (error) {
      console.error('Error creating division:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Divisions</h2>
      <ul className="mb-4">
        {divisions.map((division) => (
          <li key={division._id} className="mb-2 p-2 bg-gray-100 rounded">{division.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newDivision}
          onChange={(e) => setNewDivision(e.target.value)}
          placeholder="New division name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full"
        >
          Add Division
        </button>
      </form>
    </div>
  );
};

export default DivisionList;