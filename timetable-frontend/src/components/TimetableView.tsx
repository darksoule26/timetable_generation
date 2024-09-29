import React from 'react';

interface TimetableEntry {
  _id: string;
  division: { name: string };
  teacher: { name: string };
  classroom: { name: string };
  day: string;
  startTime: string;
  endTime: string;
}

interface Props {
  entries: TimetableEntry[];
}

const TimetableView: React.FC<Props> = ({ entries }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Timetable</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Day</th>
              <th className="border p-2">Division</th>
              <th className="border p-2">Teacher</th>
              <th className="border p-2">Classroom</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <React.Fragment key={day}>
                {entries
                  .filter((entry) => entry.day === day)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((entry) => (
                    <tr key={entry._id} className="hover:bg-gray-100">
                      <td className="border p-2">{day}</td>
                      <td className="border p-2">{entry.division.name}</td>
                      <td className="border p-2">{entry.teacher.name}</td>
                      <td className="border p-2">{entry.classroom.name}</td>
                      <td className="border p-2">
                        {entry.startTime} - {entry.endTime}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimetableView;