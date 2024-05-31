const express = require('express');
const router = express.Router();
const {
    getList,
    getListById,
    getListByName,
    addMovie,
    getAllPublicLists,
    deleteMovieFromList,
    removeUserFromList
} = require('../controllers/listController');

router.route('/lists/:userId').get(getList);
router.route('/id/:listId').get(getListById);
router.route('/name/:listname').get(getListByName);
router.route('/addmovie').post(addMovie);
router.route('/public').get(getAllPublicLists);
router.route('/remove-movie/:userId/:movieId').delete(deleteMovieFromList);
router.route('/remove-user/:listId/:userId').delete(removeUserFromList);

module.exports = router;