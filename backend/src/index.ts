import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.get("/api/greeting", (_req, res) => {
  res.json({ message: "Hello from TS backend" });
});

app.post("/api/echo", (req, res) => {
  res.json({ youSent: req.body ?? {} });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`API on http://localhost:${port}`));
