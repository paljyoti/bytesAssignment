import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

const ToDoModel = mongoose.model("Todo",TodoSchema);

export default ToDoModel;