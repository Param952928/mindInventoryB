const taskTable = require("../models/task");
const taskSchema = require("../schemas/taskSchema");
const mongoose = require("mongoose");

const taskController = {
  // Create Task
  createTask: async (req, res) => {
    try {
      // Validate the request body using Joi schema
      const { error, value } = taskSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Create a new task
      const task = new taskTable(value);
      const savedTask = await task.save();
      res.status(201).json({savedTask,  "message": "task fetched successfully"});
    } catch (err) {
      res.status(500).json({ message: "Error creating task", error: err });
    }
  },

  // Update Task
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the task exists
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Task ID" });
      }
      console.log("body : ", req.body);
      // Update task
      const updatedTask = await taskTable.findByIdAndUpdate(
        id,
        { completed: req.body.completed },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({updatedTask, "message": "task updated"});
    } catch (err) {
      res.status(500).json({ message: "Error updating task", error: err });
    }
  },

  // Get Task by ID
  getTask: async (req, res) => {
    try {
      const task = await taskTable.find();
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({task, "message": "task fetched successfully"});
    } catch (err) {
      res.status(500).json({ message: "Error retrieving task", error: err });
    }
  },

  // Delete Task
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the task exists
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Task ID" });
      }

      const deletedTask = await taskTable.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting task", error: err });
    }
  },
};

module.exports = taskController;
