import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const authModel = mongoose.model("AuthModel", authSchema);

export default authModel;