import { usersModel } from "../../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const userMutations={
async register(_,{user}){
try {
    const newUser =  await usersModel.create(user)
    
    return newUser
    
} catch (error) {
    throw new Error(" Couldn't register");
    
}
},
async login(_,{user}){
try {
    const {email ,password} = user
    if(!email || !password){
        throw new Error("Email and password are required ")
    }
    const userFound = await usersModel.findOne({email})
    if(!userFound){
        throw new Error("User not found")
    }
    const isMatch = await bcrypt.compare(password, userFound.password)
    if(!isMatch){
        throw new Error("Invalid credentials")
    }
  const token =  jwt.sign({id:userFound._id,role:userFound.role}, process.env.SECRET)
  return token
} catch (error) {
    throw new Error("Login failed" + error.message)
}
},
async deleteUser(_,{id},context){
    if(context.role=="admin"){
        try {
            await usersModel.findByIdAndDelete(id)
            return "User deleted successfully"
        } catch (error) {
            throw new Error(error.message);
            
        }
    }else{
        throw new Error("Only admin can delete users")
    }
}
}

export default userMutations