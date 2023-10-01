import ToDoService from "../../service/todo.service.js"
const getToDoList = async (req, res, next) => {
    try {
        const { userId } = req.body;
        let todoData = await ToDoService.getUserToDoList(userId);
        res.json({ status: true, success: todoData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

export default getToDoList