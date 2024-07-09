const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.Register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(200).json({
            status: 'success',
            newUser,token,
        });
        console.log(res);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (email already exists)
            res.status(400).json({
                status: 'failed',
                message: 'Email address is already in use.',
            });
        } else {
            res.status(500).json({
                status: 'failed',
                message: 'Internal server error',
            });
        }
        console.error(error);
    }
};

exports.Login = async (req, res) => {
    try {       

        const userEmail = req.body.email.trim();
        const user = await User.findOne({ email: userEmail });
        
        if (user) {
            console.log('User found:', user);

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        
            if (isPasswordValid) { 
                const token = await user.generateAuthToken();
                // console.log(token);

                res.cookie("movietoken", token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                });

                const currentUser = user;
                res.status(200).json({
                    status: 'success',
                    message: 'Login successful',
                    accesstoken: token,
                    currentUser,
                });
            } else {
                res.status(401).json({
                    status: 'failed',
                    message: 'Wrong email or password',
                });
            }
        } else {
            res.status(401).json({
                status: 'failed',
                message: 'Wrong mail or password',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error',
        });
        console.error(error);
    }
};