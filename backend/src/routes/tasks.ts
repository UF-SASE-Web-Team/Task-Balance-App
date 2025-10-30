import { Router, Request, Response } from 'express';
import { parseICSFromUrl } from "../services/tasks"

const router = Router();

// Test URL: http://localhost:3000/tasks?link=https://ufl.instructure.com/feeds/calendars/user_OS48BY4iVXJ5mjhHSw8bHLq4tVRM0XfluCwIrrbV.ics&after=0

// Precondition: URL is of a valid ICS file
router.get('/tasks', async (req: Request, res: Response) =>  {
  const link: string = req.query.link as string;
  const threshold: number = Number(req.query.after);
  // Simple input validation
  if ((link.substring(0, 8) === "https://") && (threshold >= 0)) {
    const [metadata, events] = await parseICSFromUrl(link, threshold);
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        metadata: JSON.stringify(metadata),
        tasks: JSON.parse(JSON.stringify(events))
    });
  } else {
    res.status(400).json({
        status: 'NOT OK',
        timestamp: new Date().toISOString(),
        message: "Input validation failed."
    });
  }
});

export default router;
