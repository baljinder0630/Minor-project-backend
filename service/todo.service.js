// import todoModel from "../models/todo.model.js"

// class ToDoService {
//     static async createToDo(userId, title, description) {
//         const createToDo = new todoModel({ userId, title, description })
//         return await createToDo.save()
//     }

//     static async getUserToDoList(userId) {
//         const toDoList = await todoModel.find({ userId })
//         return toDoList
//     }

//     static async deleteToDo(id) {
//         const deleted = await todoModel.findByIdAndDelete({ _id: id })
//         return deleted
//     }
// }

// export default ToDoService