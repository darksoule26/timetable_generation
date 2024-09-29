import React, { useState } from 'react';
import axios from 'axios';

interface Classroom {
  _id: string;
  name: string;
}

interface Props {
  classrooms: Classroom[];
  onUpdate: () => void;
}

const ClassroomList: React.FC<Props> = ({ classrooms, onUpdate }) => {
  const [newClassroom, setNewClassroom] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/classrooms', { name: newClassroom });
      setNewClassroom('');
      onUpdate();
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Classrooms</h2>
      <ul className="mb-4">
        {classrooms.map((classroom) => (
          <li key={classroom._id} className="mb-2 p-2 bg-gray-100 rounded">{classroom.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newClassroom}
          onChange={(e) => setNewClassroom(e.target.value)}
          placeholder="New classroom name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full"
        >
          Add Classroom
        </button>
      </form>
    </div>
  );
};

export default ClassroomList;