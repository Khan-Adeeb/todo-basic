const { Router } = require("express");
const todoRouter = Router();
const { auth } = require("../middleware/auth");

const {createController, viewController, updateController, deleteController} = require("../controllers/todo.controller");

todoRouter.post("/create", auth, createController);

todoRouter.get("/view", auth, viewController);

todoRouter.put("/update", auth, updateController);

todoRouter.delete("/delete", auth, deleteController);

module.exports = { todoRouter };