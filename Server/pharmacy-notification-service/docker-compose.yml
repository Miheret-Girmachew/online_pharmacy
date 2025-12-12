import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { initSocket } from './services/socketService';
import { addNotificationJob } from './services/queueService';
import { logger } from './config/logger';

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Initialize Socket.IO
initSocket(server);

// --- ROUTES ---

// 1. Ingest Notification (Called by Order/Inventory Service)
app.post('/v1/notify', async (req: Request, res: Response) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.SERVICE_API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Validate body (Simple check, use Zod/Joi for prod)
  const { userId, title, body } = req.body;
  if (!userId || !title || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  await addNotificationJob(req.body);
  return res.json({ status: 'queued', message: 'Notification scheduled' });
});

// 2. Register Device Token (Called by Mobile App)
app.post('/v1/devices', async (req: Request, res: Response) => {
  // In reality: const userId = req.user.id (from Auth middleware)
  const userId = req.headers['x-user-id'] as string; 
  const { fcmToken, platform } = req.body;

  if (!userId || !fcmToken) return res.status(400).json({ error: 'Missing data' });

  try {
    await prisma.deviceToken.upsert({
      where: { token: fcmToken },
      update: { userId, platform, updatedAt: new Date() },
      create: { userId, token: fcmToken, platform },
    });
    res.json({ success: true });
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: 'Database error' });
  }
});

// 3. Get Notifications (Called by Client)
app.get('/v1/notifications', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const limit = 50;
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  res.json(notifications);
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Notification Service running on port ${PORT}`);
});