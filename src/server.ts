import express, { Request, Response } from 'express';
import { config } from './config/app.config.js';
import connectDB from './config/db.config.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { asyncHandler } from './middlewares/asyncHandler.middleware.js';
import status from 'http-status';
const app = express();

const PORT = config.PORT;

await connectDB();

app.get(
  '/',
  asyncHandler((req: Request, res: Response) => {
    return res.status(status.OK).json({
      message: 'Hello Subscribe to the channel & share'
    });
  })
);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
