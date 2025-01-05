import mongoose from "mongoose";


const connectDb = () => {
  try {
    return mongoose.connect(
      "mongodb+srv://jyot2999:12345@cluster0.0n0rs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  } catch (error) {
    throw new Error(`something went wrong ${error}`);
  }
};

export default connectDb;