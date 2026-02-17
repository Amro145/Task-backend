import mongoose from "mongoose";
import Task from "../Models/TaskModels.js";
export const CreateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    console.log(title, description, status);
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({
      user: req.user.id,
      title,
      description: description || "",
      status: status || "pending",
    });
    await newTask.save();
    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const GetTasks = async (req, res) => {
  try {
    const Tasks = await Task.find({ user: req.user.id });
    if (Tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json(Tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const GetTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid Task ID is required" });
    }
    const task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid Task ID is required" });
    }

    if (!title && !description && !status) {
      return res.status(400).json({ message: "At least one field (title, description, or status) is required to update" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid Task ID is required" });
    }
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const CompleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid Task ID is required" });
    }
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status: "completed" },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
