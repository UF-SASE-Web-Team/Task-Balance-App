import { Router, Request, Response } from 'express';
import { parseICSFromUrl } from "../services/tasks"

const router = Router();

// Test URL: http://localhost:3002/tasks?user_id=user_OS48BY4iVXJ5mjhHSw8bHLq4tVRM0XfluCwIrrbV&after=0

// Precondition: URL is of a valid ICS file
router.get('/tasks', async (req: Request, res: Response) =>  {
  // URL Params
  const user_id: string = req.query.user_id as string;
  const threshold: number = Number(req.query.after);
  // Simple input validation
  const [metadata, events] = await parseICSFromUrl(user_id, threshold);
  res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      metadata: JSON.stringify(metadata),
      tasks: JSON.parse(JSON.stringify(events))
  });
});

export default router;
