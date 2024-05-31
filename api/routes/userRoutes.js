const express = require('express');
const router = express.Router();
const {getAllUsers , getUserById ,updateUser , deleteUser, } = require('../controllers/userController');
const {Login,Register} = require('../controllers/authController');

router.route('/users').get(getAllUsers);
router.route('/user/:id').get(getUserById);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/register').post(Register);
router.route('/login').post(Login);

module.exports = router;
