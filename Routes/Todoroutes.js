import express from "express";
import {
  deleteTask,
  getAllTask,
  getTaskById,
  postTodo,
  updateStatus,
} from "../Controller/Todocontroller.js";
import { protectedRoute } from "../Middleware/ProtectedRoute.js";

const router = express.Router();

router.post("/tasks", protectedRoute, postTodo);
router.get("/tasks", protectedRoute, getAllTask);
router.get("/tasks/:id", protectedRoute, getTaskById);
router.put("/tasks/:id", protectedRoute, updateStatus);
router.delete("/tasks/:id", protectedRoute, deleteTask);

export default router;
