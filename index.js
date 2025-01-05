import express from "express";
import connectDb from "./Database/Connectdb.js";
import TodoRoutes from "./Routes/Todoroutes.js";
import cookieParser from "cookie-parser";
import AuthRoutes from "./Routes/AuthRoutes.js"
import cors from "cors"


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({credentials: true}))
app.use("/api",TodoRoutes);
app.use("/auth", AuthRoutes)



connectDb()
  .then((res) => {
    console.log("Database successfully connected");
  })
  .catch((error) => {
    console.log(`Database failed ${error}`);
  });

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
