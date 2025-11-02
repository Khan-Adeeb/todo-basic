const mongoose = require("mongoose");
const { lowercase } = require("zod");
const Schema = mongoose.Schema;

const user = new Schema({
    email : {
        type :String,
        unique: true,
        trim : true,
        lowercase: true,
        required : true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
}, {timestamps: true});

const todo = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    done: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const UserModel = mongoose.model('user', user);
const TodoModel = mongoose.model('todo', todo);

module.exports = {UserModel, TodoModel} 