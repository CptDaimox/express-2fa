import { defaultErrorHandler, errorLogger, httpErrorHandler } from "@middlewares/errorHandler";
import { connectToMongoDB } from "@middlewares/mongoConnect";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { config } from "./common/config";
import { mainRouter } from "./routes";

if(!config) throw new Error("Environment variables are not defined");

const app: Express = express();
const port = process.env.PORT || 3000;

// Pre-Request middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB connection
app.use(connectToMongoDB);

// Routes
app.use("/", mainRouter);

// Error Handlers
app.use(errorLogger);
app.use(httpErrorHandler);
app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
