const mongoose = require('mongoose');

// Task 3: Mongoose Blog Schema with validations and virtuals
const commentSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post title is mandatory'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters long']
    },
    slug: { type: String, lowercase: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Ansh Tyagi' },
    tags: [{ type: String }],
    comments: [commentSchema], // Embedded subdocument array
    published: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
