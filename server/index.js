import express from "express";
import dotenv from "dotenv";
import employeesRouter from "./routes/employees.js";

// Load environment variables from .env file
dotenv.config();

// create app
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

// Routes
app.use("/employees", employeesRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
