import mongoose from "mongoose";

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
        console.log("connnection to mongodb erroe :" ,err)
    }
    
}

export default connect;