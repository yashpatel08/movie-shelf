const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 4000;
app.use(cors({
    origin: "https://movie-shelf-nine.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});


app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/lists', listRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB')) 
    .catch(error => console.log(error));
console.log('Conneted to mongodb');

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});