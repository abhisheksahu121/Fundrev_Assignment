import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import multer from 'multer';
import { upload } from './middlewares/authMiddleware.js';
//configure env
// env file created on root directory so no need to pass the path object into config
dotenv.config();

//database
connectDB();

//rest obj
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Use Multer middleware for handling file uploads
app.use('/api/v1/auth', upload.single('file'));

//routes
app.use('/api/v1/auth',authRoutes);

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Ecommerce app</h1>")
})

//PORT
const PORT = process.env.PORT || 8000;

// run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`)
})