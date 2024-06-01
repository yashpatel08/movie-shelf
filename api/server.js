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
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true
}));

app.use(cors({
    origin: ["https://movie-shelf-dun.vercel.app"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/lists', listRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then('Conneted to mongodb')
    .catch(error => console.log(error));
console.log('Conneted to mongodb');

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});