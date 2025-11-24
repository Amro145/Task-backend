import Task from "../Models/TaskModels.js";
export const CreateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    console.log(title, description, status);
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({
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
    const Tasks = await Task.find();
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
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const task = await Task.findById(id);
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
    if (!title && !description && !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    await updatedTask.save();
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
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const task = await Task.findByIdAndDelete(id);
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
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const task = await Task.findByIdAndUpdate(
      id,
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
