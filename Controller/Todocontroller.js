import { response } from "express";
import ToDoModel from "../Models/TodoModel.js";

export const postTodo = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res
        .status(442)
        .json({ status: false, message: "please provide all required fields" });
    }

    const newTodo = new ToDoModel({
      Title: title,
      Description: description,
      Status: status,
    });

    const response = await newTodo.save();
    if (response) {
      return res
        .status(201)
        .json({ status: true, message: "Todo created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err: error });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const getAllTask = await ToDoModel.find();

    return res.status(201).json({
      status: true,
      message: "successfully fetch all task",
      data: getAllTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err: error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return res
        .status(442)
        .json({ status: false, message: "please provide ID" });
    }

    const task = await ToDoModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }

    return res.status(201).json({
      status: true,
      message: "Fetch a task by its ID",
      data: task,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err: error });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    if (!taskId) {
      return res
        .status(442)
        .json({ status: false, message: "please provide ID" });
    }

    const task = await ToDoModel.updateOne(
      { _id: taskId },
      { $set: { Status: status } }
    );
    if (task.matchedCount > 0) {
      return res.status(201).json({
        status: true,
        message: "task id updated",
        data: task,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err: error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return res
        .status(442)
        .json({ status: false, message: "please provide ID" });
    }

    const task = await ToDoModel.deleteOne({ _id: taskId });
    if (task.deletedCount > 0) {
      return res.status(201).json({
        status: true,
        message: "task deleted",
        data: task,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err: error });
  }
};
