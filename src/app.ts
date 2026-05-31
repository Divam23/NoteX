import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import { errorMiddleware } from './shared/middlewares/error.middleware';
import morgan from 'morgan';
import routes from './routes/global.routes';

configDotenv();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));

// health route
app.get('/health', (_, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

//routes import
app.use("/api/v1", routes)

//error middleware
app.use(errorMiddleware);

export { app };
