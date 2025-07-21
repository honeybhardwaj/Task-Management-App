const Task = require("../models/Task");
const { validationResult } = require("express-validator");
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
exports.getTasks = async (req, res) => {
  const { status, priority, search } = req.query;
  const filter = { userId: req.user.id };
  if (status) filter.isCompleted = status === "completed";
  if (priority) filter.priority = priority;
  if (search) filter.title = { $regex: search, $options: "i" };
  const tasks = await Task.find(filter).sort({ dueDate: 1 });
  res.json(tasks);
};
exports.getTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
  res.json(task);
};
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: "Task deleted" });
};
