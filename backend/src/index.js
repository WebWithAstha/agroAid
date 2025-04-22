import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import servicesRoutes from './routes/services.routes.js';
import assistRoutes from './routes/assist.routes.js';
import ivrRoutes from './routes/ivr.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config/config.js';
import fileUpload from 'express-fileupload';
import { isAuthenticated } from './middlewares/auth.middleware.js';

const app = express();

const allowedOrigins = config.corsOrigin.split(',').map(e => e.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));



app.use(morgan('dev'))
app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload());




app.use('/api/auth', authRoutes);
app.use('/api/services',isAuthenticated, servicesRoutes)
app.use('/api/assist', assistRoutes)
app.use('/api/ivr', ivrRoutes)

app.use("/", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


export default app;
