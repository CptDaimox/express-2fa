import { defaultErrorHandler, errorLogger, httpErrorHandler } from "@middlewares/errorHandler";
import { userRouter } from "@/components/user";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import { connectToMongoDB } from "@middlewares/mongoConnect";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Pre-Request middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB connection
app.use(connectToMongoDB);

// Routes
app.use("/users", userRouter);

// Error Handlers
app.use(errorLogger);
app.use(httpErrorHandler);
app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
