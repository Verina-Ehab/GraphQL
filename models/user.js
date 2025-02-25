import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:18
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(email){
                return /^[a-zA-Z]{4,10}[0-9]{0,4}(@)(gmail|yahoo|outlook)(.com)$/.test(email)

            },
            message:(obj)=>`${obj.value} is not a valid email address`
        }
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
}, { Collection:'User'})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const usersModel = mongoose.model('User',userSchema)
export { usersModel}