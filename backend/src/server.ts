import express from "express";
import healthRouter from "./routes/health";
import bettingRouter from "./routes/betting";

const app = express();

app.use(healthRouter);
app.use(bettingRouter);

export default app;
