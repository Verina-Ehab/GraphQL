import { todoModel } from "../../models/todo.js";

const todoQueries={
async todos(){
    try {
        return await todoModel.find({});
        
    } catch (error) {
         throw new Error("Error fetching todos" +" "+ error.message);
    }
},

async todo(_,{id}){
    try {
        if(!id){
            throw new Error("No id provided");
        }
        return await todoModel.findById(id);
        
    } catch (error) {
         throw new Error("Error fetching todo" +" "+ error.message);
    }
},


    
}

export default todoQueries;