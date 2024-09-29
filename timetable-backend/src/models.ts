import mongoose, { Schema, Document } from 'mongoose';

interface IDivision extends Document {
  name: string;
}

interface ITeacher extends Document {
  name: string;
}

interface IClassroom extends Document {
  name: string;
}

interface ITimetableEntry extends Document {
  division: Schema.Types.ObjectId;
  teacher: Schema.Types.ObjectId;
  classroom: Schema.Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
}

const DivisionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

const TeacherSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const ClassroomSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

const TimetableEntrySchema: Schema = new Schema({
  division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export const Division = mongoose.model<IDivision>('Division', DivisionSchema);
export const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);
export const Classroom = mongoose.model<IClassroom>('Classroom', ClassroomSchema);
export const TimetableEntry = mongoose.model<ITimetableEntry>('TimetableEntry', TimetableEntrySchema);