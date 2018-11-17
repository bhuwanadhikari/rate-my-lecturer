const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Lecturer Model
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    faculty: {
        type: String,
        required: true
    }
});


module.exports = User = mongoose.model('users', userSchema);