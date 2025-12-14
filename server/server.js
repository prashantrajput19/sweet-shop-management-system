import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/dbConnect.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 1000

const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Server is running');
});


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

export default app;