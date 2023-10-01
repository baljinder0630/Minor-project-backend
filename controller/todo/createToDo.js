import ToDoService from "../../service/todo.service.js"

const createToDo = async (req, res, next) => {
    try {
        const { userId, title, desc } = req.body;
        let todoData = await ToDoService.createToDo(userId, title, desc);
        res.json({ status: true, success: todoData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

export default createToDo