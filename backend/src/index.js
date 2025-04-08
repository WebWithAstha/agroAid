import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
const app = express();


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRoutes)

app.use("/", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


export default app;
