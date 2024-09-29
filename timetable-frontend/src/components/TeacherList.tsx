import React, { useState } from 'react';
import axios from 'axios';

interface Teacher {
  _id: string;
  name: string;
}

interface Props {
  teachers: Teacher[];
  onUpdate: () => void;
}

const TeacherList: React.FC<Props> = ({ teachers, onUpdate }) => {
  const [newTeacher, setNewTeacher] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/teachers', { name: newTeacher });
      setNewTeacher('');
      onUpdate();
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Teachers</h2>
      <ul className="mb-4">
        {teachers.map((teacher) => (
          <li key={teacher._id} className="mb-2 p-2 bg-gray-100 rounded">{teacher.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTeacher}
          onChange={(e) => setNewTeacher(e.target.value)}
          placeholder="New teacher name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full"
        >
          Add Teacher
        </button>
      </form>
    </div>
  );
};

export default TeacherList;