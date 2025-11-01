const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId ;

const user = new Schema({
    email : {type :String , unique: true},
    password: String,
    name: String
})

const todo = new Schema({
    userId : ObjectId,
    title : String ,
    description : String,
    done : Boolean ,
})

const UserModel = mongoose.model('users', user);
const TodoModel = mongoose.model('todos', todo);

module.exports = {
    UserModel: UserModel, 
    TodoModel: TodoModel
} 