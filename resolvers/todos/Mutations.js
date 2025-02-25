import  {todoModel} from "../../models/todo.js"
const todoMutations={
    async addTodo(_,{todo}){
        try {
            const todoTask = await todoModel.create(todo)
            return todoTask
            
        } catch (error) {
            throw new Error( `Couldn't add todo`+ error.message);
            
        }
    },

    async updateTodo(_,{id,todo}){
        try {
            const updateTodo = await todoModel.findByIdAndUpdate(
                id,
                {$set:todo},
                {new: true}
            )
            if (!updateTodo) {
                throw new Error("No todo found with given id");
            }
            return updateTodo
            
        } catch (error) {
             throw new Error(`Couldn't update todo`+ error.message);
        }
    },

    async deleteTodo(_,{id}){
        try {
            await todoModel.findByIdAndDelete(id)
            return  "Todo deleted successfully";
        } catch (error) {
             throw new Error("Couldn't delete todo" + error.message);
        }
    }
}

export default todoMutations;