import { usersModel } from "../../models/user.js"

const userQuaries = {
async users(){
    try {
        const users = await  usersModel.find({})
        return users;
        
    } catch (error) {
        throw new Error("Error while retrieving users", error)
    }


},

async user(_,{id}){
    try {
        const user =  await  usersModel.findById(id)
        if(!user){
            throw new Error("User not found")
        }else{
        return user
        }
        
    } catch (error) {
       throw new Error(" Couldn't find user ");
       
        
    }
}
}
export default userQuaries