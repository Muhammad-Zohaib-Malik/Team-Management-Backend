import express, { Request, Response } from 'express';
import { config } from './config/app.config.js';
import connectDB from './config/db.config.js';
import status from 'http-status';
import cookieParser from 'cookie-parser';
import { asyncHandler } from './middlewares/asyncHandler-middleware.js';
import { errorHandler } from './middlewares/error-handler/error.middleware.js';
import authRoutes from './routes/auth.route.js';
const app = express();
app.use(express.json());
app.use(cookieParser(config.COOKIE_PARSER_SECRET));

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

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
