const router = require('express').Router();
const Task = require('../models/taskModels');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); 
  } catch (err) {
    next(err);
  }
});

router.route('/add').post(async (req, res, next) => {
  const name = req.body.name;
  try {
    const newTask = new Task({ name });
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (err) {
    next(err);
  }
});

router.route('/update/:id').put(async (req, res, next) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Task updated successfully' }); 
  } catch (err) {
    next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' }); 
  } catch (err) {
    next(err);
  }
});

module.exports = router;
