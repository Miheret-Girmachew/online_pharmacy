import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger';
import { JwtPayload } from '../types';

let io: Server;

// Extend Socket interface to include userId
interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: { origin: "*" }
  });

  // Authentication Middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error: No token"));

    try {
      const secret = process.env.JWT_SECRET || 'default_secret';
      const decoded = jwt.verify(token, secret) as JwtPayload;
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    if (socket.userId) {
      logger.info(`User connected via Socket: ${socket.userId}`);
      socket.join(socket.userId); // Join room
    }

    socket.on('disconnect', () => {
      // Cleanup if needed
    });
  });
};

export const emitRealTime = (userId: string, event: string, data: any) => {
  if (io) {
    io.to(userId).emit(event, data);
    logger.info(`Real-time event '${event}' sent to user ${userId}`);
  }
};