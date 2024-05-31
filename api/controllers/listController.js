const List = require('../models/List');
const mongoose = require('mongoose');

exports.getList = async (req, res) => {
    try {
        const userId = req.params.userId;
        const lists = await List.find({ 'user': userId })

        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getListByName = async (req, res) => {
    try {

        const lists = await List.findOne({ listname: req.params.listname }).populate('users.user', 'name email');

        if (!lists) {
            return res.status(404).json({ message: 'List not found' });
        }

        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getListById = async (req, res) => {
    try {
        const list = await List.findById(req.params.listId).populate('users.user', 'name email');

        if (!list) {
            return res.status(404).json({
                msg: 'List not found'
            });
        }

        res.json(list);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.addMovie = async (req, res) => {
    const { listname, movieId, moviename, visible, user } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
    }

    try {
        let list = await List.findOne({ listname: `${listname}_${user}`, user: user });
        if (!list) {
            list = new List({
                listname: `${listname}_${user}`,
                movies: [{ movieId, moviename }],
                visible,
                user: user
            });
        } else {
            const movieExists = list.movies.some(m => m.movieId === movieId);
            if (!movieExists) {
                list.movies.push({ movieId, moviename });
            }
        }

        await list.save();
        res.status(201).json(list);
    } catch (error) {
        console.error('Error in addMovie:', error.message);
        console.error('Stack Trace:', error.stack);
        res.status(500).json({ message: error.message });
    }
};


exports.getAllPublicLists = async (req, res) => {
    try {
        const lists = await List.find({ visible: 'public' }).populate('users.user', 'name email');

        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteMovieFromList = async (req, res) => {
    const { movieId, userId } = req.params;

    try {
        const list = await List.findOne({ 'movies.movieId': movieId, 'user': userId });

        if (!list) {
            return res.status(404).json({ message: 'Movie not found in the user\'s lists' });
        }

        const movieIndex = list.movies.findIndex(movie => movie.movieId === movieId && list.user.toString() === userId.toString());

        if (movieIndex > -1) {
            list.movies.splice(movieIndex, 1);
            await list.save();
            res.json({ message: 'Movie removed from the user\'s list' });
        } else {
            res.status(404).json({ message: 'Movie not found in the user\'s list' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeUserFromList = async (req, res) => {
    try {
        const list = await List.findById(req.params.listId);

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        const userId = req.params.userId;
        const userIndex = list.users.findIndex(user => user.user.toString() === userId);

        if (userIndex > -1) {
            // Remove the user from the users array
            list.users.splice(userIndex, 1);

            // Remove all movies added by this user from the movies array
            list.movies = list.movies.filter(movie => movie.user.toString() !== userId);

            await list.save();
            res.json({ message: 'User and their movies removed from list' });
        } else {
            res.status(404).json({ message: 'User not found in list' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};