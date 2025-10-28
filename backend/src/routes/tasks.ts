import { Router, Request, Response } from 'express';
import { exampleUsage } from "../services/tasks"

const router = Router();

router.get('/tasks', async (req: Request, res: Response) =>  {
  await exampleUsage();
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;