
const { TodoModel } = require('../database/db');


const createController = async(req ,res) => {
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
}

const viewController = async(req, res) => {
    const userId = req.userId;
    const todo = await TodoModel.find({
        userId: userId
    })

    res.json({
        todo
    })

}

const updateController = async (req ,res)=>{
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
}

const deleteController = async(req, res) => {
    const userId = req.userId;
    const courseId = req.body ; 
    
    const todos = await TodoModel.deleteOne({
        _id: courseId,
        userId: userId
    })

    res.json({
        msg : "Todo Deleted!" 
    })
}

module.exports = {createController , viewController , updateController , deleteController}