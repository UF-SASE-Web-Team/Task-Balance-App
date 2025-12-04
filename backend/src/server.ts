import express from "express";
import healthRouter from "./routes/health";
import bettingRouter from "./routes/betting";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(healthRouter);
app.use(bettingRouter);
app.use(tasksRouter);

export default app;
