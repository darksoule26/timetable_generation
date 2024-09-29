import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DivisionList from './components/DivisionList';
import TeacherList from './components/TeacherList';
import ClassroomList from './components/ClassroomList';
import TimetableForm from './components/TimetableForm';
import TimetableView from './components/TimetableView';

interface Division {
  _id: string;
  name: string;
}

interface Teacher {
  _id: string;
  name: string;
}

interface Classroom {
  _id: string;
  name: string;
}

interface TimetableEntry {
  _id: string;
  division: Division;
  teacher: Teacher;
  classroom: Classroom;
  day: string;
  startTime: string;
  endTime: string;
}

const App: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [timetableEntries, setTimetableEntries] = useState<TimetableEntry[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [divisionsRes, teachersRes, classroomsRes, timetableRes] = await Promise.all([
        axios.get<Division[]>('http://localhost:5000/api/divisions'),
        axios.get<Teacher[]>('http://localhost:5000/api/teachers'),
        axios.get<Classroom[]>('http://localhost:5000/api/classrooms'),
        axios.get<TimetableEntry[]>('http://localhost:5000/api/timetable'),
      ]);

      setDivisions(divisionsRes.data);
      setTeachers(teachersRes.data);
      setClassrooms(classroomsRes.data);
      setTimetableEntries(timetableRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Timetable Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DivisionList divisions={divisions} onUpdate={fetchData} />
        <TeacherList teachers={teachers} onUpdate={fetchData} />
        <ClassroomList classrooms={classrooms} onUpdate={fetchData} />
      </div>
      <TimetableForm
        divisions={divisions}
        teachers={teachers}
        classrooms={classrooms}
        onSubmit={fetchData}
      />
      <TimetableView entries={timetableEntries} />
    </div>
  );
};

export default App;