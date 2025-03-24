import mongoose, {Schema} from "mongoose";

interface IUser{
    name:string;
    email:string;
    password:string;
    username:string;
}

const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;