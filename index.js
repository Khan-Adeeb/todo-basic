const express = require('express')
const mongoose = require("mongoose");
const {UserModel , TodoModel } = require("./database/db")
var jwt = require('jsonwebtoken'); 
const bcrypt = require("bcrypt")
const { z } = require("zod");
const app = express();
const port = 3000;
const {auth , JWT_SECRET} = require('./middleware/auth')
const {loginRouter} = require("./routes/login")
const {todoRouter} = require("./routes/todo")
app.use(express.json());

app.use("/v1" , loginRouter );
app.use("/todo" , todoRouter);

async function main (){
    await mongoose.connect("mongodb+srv://admin:nnKyRnWuN8nDfrJt@cluster0.enyplof.mongodb.net/todo-database") 
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
main();
