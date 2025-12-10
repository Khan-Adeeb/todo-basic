const { TodoModel } = require('../database/db');
const { z } = require("zod");

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  done: z.boolean().optional()
});


const createController = async(req ,res) => {
    const userId = req.userId;

    const parsedData = todoSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ msg: "Invalid todo data", errors: parsedData.error.errors });
    }
    
    const {title , description } = parsedData.data

    try{
        await TodoModel.create({
            userId,
            title,
            description
        })

        res.status(201).json({
            msg: "todo created!"
        })

    }catch(e){
        res.status(500).json({
            msg: "Error creating todo",
            error: e.message 
        })
    }
}

const viewController = async(req, res) => {
    const userId = req.userId;

    try{
        const todos = await TodoModel.find({
            userId: userId
        })
        res.status(200).json({ 
            todos
        });

    } catch (e) {
        res.status(500).json({ 
            msg: "Error fetching todos", 
            error: e.message 
        });
    }
}

const updateController = async (req ,res)=>{
    const userId = req.userId;
    const {title , description , done , todoId} = req.body ; 
    
    try{ 
        const result = await TodoModel.updateOne({
            _id: todoId,
            userId: userId
        }, {
            title: title,
            description: description,
            done: done
        })
        if (result.matchedCount === 0) {
          return res.status(404).json({ msg: "Todo not found or unauthorized" });
        }
        res.status(200).json({ msg: "Todo updated!" });
    } catch (e) {
        res.status(500).json({ msg: "Error updating todo", error: e.message });
    }
};

const deleteController = async(req, res) => {
    const userId = req.userId;
    const {todoId} = req.body ; 
    
    try{
        const result = await TodoModel.deleteOne({
            _id: todoId,
            userId: userId
        })

        if (result.deletedCount === 0) { 
            return res.status(404).json({
                msg: "Todo not found "
            })
        }
        res.status(200).json({
            msg : "Todo Deleted!" 
        })
       
    }catch(e){
        res.status(200).json({ msg: "Error updating todo", error: e.message })
    }
    
}

module.exports = {createController , viewController , updateController , deleteController}