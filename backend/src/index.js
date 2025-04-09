import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import cors from 'cors';
import axios from 'axios';
const app = express();


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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
