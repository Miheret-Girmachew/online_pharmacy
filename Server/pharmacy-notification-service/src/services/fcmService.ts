import admin from 'firebase-admin';
import { logger } from '../config/logger';

let isInitialized = false;

// Initialize Firebase
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    isInitialized = true;
    logger.info("Firebase Admin Initialized");
  } catch (error) {
    logger.error("Firebase Init Failed", error);
  }
} else {
  logger.warn("Running in MOCK FCM mode (No credentials provided)");
}

export const sendPushNotification = async (
  token: string, 
  title: string, 
  body: string, 
  data?: Record<string, any>
) => {
  if (!isInitialized) {
    logger.info(`[MOCK PUSH] To: ${token} | Title: ${title}`);
    return;
  }

  try {
    // Ensure all data values are strings for FCM
    const stringifiedData = data 
      ? Object.keys(data).reduce((acc, key) => {
          acc[key] = String(data[key]);
          return acc;
        }, {} as Record<string, string>)
      : {};

    await admin.messaging().send({
      token,
      notification: { title, body },
      data: stringifiedData,
    });
  } catch (error) {
    logger.error(`FCM Send Error for token ${token.slice(0, 10)}...`, error);
  }
};