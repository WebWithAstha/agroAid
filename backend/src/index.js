import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(morgan('dev'))
app.use(express.json({limit: '10mb', extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/services' , servicesRoutes)

app.use("/", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


export default app;
