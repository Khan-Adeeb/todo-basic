const { Router } = require('express');
const todoRouter = Router();
const {createController , viewController , updateController , deleteController} = require ('../controllers/todo.controller');


todoRouter.post('/create', auth, createController);

todoRouter.get('/view', auth , viewController)

todoRouter.put('/update', auth , updateController)

todoRouter.delete('/delete', deleteController)

module.exports = {
    todoRouter: todoRouter
} 