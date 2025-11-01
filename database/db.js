const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId ;

const user = new Schema({
    email : {
        type :String,
        unique: true,
        trim : true,
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
})

const todo = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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
});

const UserModel = mongoose.model('users', user);
const TodoModel = mongoose.model('todos', todo);

module.exports = {
    UserModel: UserModel, 
    TodoModel: TodoModel
} 