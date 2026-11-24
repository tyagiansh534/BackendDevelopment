const mongoose = require('mongoose');

// Task 4: Comprehensive Data Validation
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    age: {
        type: Number,
        min: [18, 'Must be at least 18 years old'],
        max: [100, 'Exceeds maximum allowable age']
    },
    role: {
        type: String,
        enum: {
            values: ['student', 'instructor', 'admin'],
            message: '{VALUE} is not a valid user role'
        },
        default: 'student'
    }
});

const User = mongoose.model('ValidatedUser', userSchema);
module.exports = User;
