import { Request, Response } from "express";
import { createConnection } from "@common/mongodb";
import { HttpException } from "./errorHandler";

/**
 * Middleware function to establish a connection to the MongoDB database.
 *
 * @param req Express Request object.
 * @param res Express Response object.
 * @param next Express NextFunction object.
 */
async function connectToMongoDB(req: Request, res: Response, next: () => void) {
  const connected = await createConnection();
  if (connected) {
    next();
  } else {
    throw new HttpException("Could not connect to database.", 500);
  }
}

export { connectToMongoDB };
