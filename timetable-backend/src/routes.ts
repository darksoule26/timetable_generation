import express, { Request, Response } from 'express';
import { Division, Teacher, Classroom, TimetableEntry } from './models';

const router = express.Router();

// Division routes
router.get('/divisions', async (req: Request, res: Response) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching divisions' });
  }
});

router.post('/divisions', async (req: Request, res: Response) => {
  try {
    const division = new Division(req.body);
    await division.save();
    res.status(201).json(division);
  } catch (error) {
    res.status(400).json({ message: 'Error creating division' });
  }
});

// Teacher routes
router.get('/teachers', async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers' });
  }
});

router.post('/teachers', async (req: Request, res: Response) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: 'Error creating teacher' });
  }
});

// Classroom routes
router.get('/classrooms', async (req: Request, res: Response) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classrooms' });
  }
});

router.post('/classrooms', async (req: Request, res: Response) => {
  try {
    const classroom = new Classroom(req.body);
    await classroom.save();
    res.status(201).json(classroom);
  } catch (error) {
    res.status(400).json({ message: 'Error creating classroom' });
  }
});

// Timetable entry routes
router.get('/timetable', async (req: Request, res: Response) => {
  try {
    const entries = await TimetableEntry.find()
      .populate('division')
      .populate('teacher')
      .populate('classroom');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable entries' });
  }
});

router.post('/timetable', async (req: Request, res: Response) => {
  try {
    const entry = new TimetableEntry(req.body);
    
    // Check for conflicts
    const conflicts = await TimetableEntry.find({
      $or: [
        { teacher: entry.teacher, day: entry.day, startTime: entry.startTime },
        { classroom: entry.classroom, day: entry.day, startTime: entry.startTime },
      ],
    });

    if (conflicts.length > 0) {
      return res.status(400).json({ message: 'Conflict detected. Teacher or classroom is already booked for this time slot.' });
    }

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating timetable entry' });
  }
});

export default router;