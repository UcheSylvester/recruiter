import { Router } from "express";

const employeesRouter = Router();

employeesRouter.get("/", (req, res) => {
  res.send("Employees");
});

employeesRouter.post("/", (req, res) => {
  // console.log(req.body);

  try {
    res.status(201).json({
      message: "Employee created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default employeesRouter;
