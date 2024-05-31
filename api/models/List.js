const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    listname: {
        type: String,
        required: true,
    },
    movies: [
        {
            movieId: {
                type: String,
                required: true
            },
            moviename: {
                type: String,
                required: true
            }
        }
    ],
    visible: {
        type: String,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { versionKey: false });

const List = mongoose.model('List', ListSchema);

module.exports = List;