const { Router } = require('express');
const { TodoModel } = require('../database/db');
const todoRouter = Router();

todoRouter.post('/create', auth, async(req ,res) => {
    const userId = req.userId;
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

todoRouter.get('/view', auth , async(req, res) => {
    const userId = req.userId;
    const todo = await TodoModel.find({
        userId: userId
    })

    res.json({
        todo
    })

})

todoRouter.put('/update', auth , async (req ,res)=>{
    const userId = req.userId;
    const {title , desc , completed , courseId} = req.body ; 
    
    const todos = await TodoModel.updateOne({
        _id: courseId,
        userId: userId
    }, {
        title : title,
        done : completed,
        description : desc
    })

    res.json({
        msg : "Todo Updated!" 
    })
})

todoRouter.delete('/delete', async(req, res) => {
    const userId = req.userId;
    const {title , desc , completed , courseId} = req.body ; 
    
    const todos = await TodoModel.deleteOne({
        _id: courseId,
        userId: userId
    })

    res.json({
        msg : "Todo Updated!" 
    })
})

module.exports = {
    todoRouter: todoRouter
} 