// Define shared interfaces here
export interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface JwtPayload {
  id: string; // User ID
  role?: string;
}