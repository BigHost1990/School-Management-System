import Teacher from '../models/teacher.model.js';
import Class from '../models/class.model.js';
import { errorHandler } from '../utils/error.js';

export const createTeacher = async (req, res, next) => {
  try {
    const className = req.body.assignedClass;

    const foundClass = await Class.findOne({ name: className });
    if (!foundClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    const newTeacher = await Teacher.create({
      ...req.body,
      assignedClass: foundClass
    });

    // Update the class with the newly created teacher
    foundClass.teacher = newTeacher._id;
    await foundClass.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    // Find the teacher to be deleted
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Delete the teacher
    await Teacher.findByIdAndDelete(req.params.id);

    // Remove the teacher's ID from the associated class
    const foundClass = await Class.findOne({ teacher: req.params.id });
    if (foundClass) {
      foundClass.teacher = undefined;
      await foundClass.save();
    }

    res.status(200).json({ message: 'Teacher has been deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (req, res, next) => {
  const Teacher= await Teacher.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Teacher not found!'));
  }
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTeacher);
  } catch (error) {
    next(error);
  }
};

export const getTeacher = async (req, res, next) => {
  try {
    const Teacher = await Teacher.findById(req.params.id).populate('assignedClass');
    if (!Teacher) {
      return next(errorHandler(404, 'Teacher not found!'));
    }
    res.status(200).json(Teacher);
  } catch (error) {
    next(error);
  }
};

export const getTeachers = async (req, res, next) => {
  try {
    const Teachers = await Teacher.find().populate('assignedClass');
    return res.status(200).json(Teachers);
  } catch (error) {
    next(error);
  }
};
