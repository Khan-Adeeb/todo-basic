const express = require('express')
const mongoose = require("mongoose");
const {UserModel , TodoModel } = require("./database/db")
var jwt = require('jsonwebtoken'); 
const app = express();
const port = 3000;
const {auth , JWT_SECRET} = require('./middleware/auth')
app.use(express.json());

mongoose.connect("mongodb+srv://admin:nnKyRnWuN8nDfrJt@cluster0.enyplof.mongodb.net/todo-database")

// app.get('/' , (req,res)=>{
//     res.sendFile(__dirname + "/public/index.html")
// })

app.post('/signup', async (req , res) => {
    const email = req.body.email ; 
    const password = req.body.password ;
    const name = req.body.name ; 

    try {
        await UserModel.create({
            email : email,
            password : password,
            name : name
        })
        res.status(200).json({
            msg : "successfully signed up!"
        })

    } catch (error) {
        res.json({
            mes: "already signed in!"
        })
    }

})

app.post('/signin' , async (req, res) => {
    const email = req.body.email ; 
    const password = req.body.password ;
    

    let user = await UserModel.findOne({
        email  : email ,
        password : password
    })

    if(!user){
        res.status(403).json({
            msg : "Username or password is incorrect"
        })
    }else{
        const userID = user._id.toString()
        
        let token = jwt.sign({
            id : userID
        }, JWT_SECRET);

        res.json({
            msg : "sucessfully signed in",
            token: token
        })
    }

})

app.post('/todos', auth, async(req ,res) => {
    const userId = req.userId;
    console.log(userId);
    
    const title = req.body.title;
    const desc = req.body.description;
    const done = req.body.done;

    try{
        await TodoModel.create({
            userId,
            title,
            description : desc,
            done
        })

        res.status(200).json({
            msg: "todo created!"
        })

    }catch(e){
        res.json({
            err : e
        })
    }
    
})

app.get('/todos',auth , async(req, res) => {
    const userId = req.userId;

    const todo = await TodoModel.find({
        userId
    })

    res.json({
        todo
    })

})

// app.put('/todos/:id', (req ,res)=>{
//     let id = req.params.id;
//     let updateReq = req.body;

//     let idxToUpdate = todo.findIndex(obj => obj.id == id);

//     if (idxToUpdate !== -1) {
//         todo[idxToUpdate] = { ...todo[idxToUpdate], ...updateReq };
//         res.status(200).json({
//             message : "Array updated"
//         })

//     } else {
//         res.status(404).json({
//             err : "Id not found"
//         })
//     }

// })

// app.delete('/todos/:id', (req, res) => {
//     var pos = req.params.id;
//     todo.splice(pos - 1, 1);

//     res.status(200).json("Successfully Deleted")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
