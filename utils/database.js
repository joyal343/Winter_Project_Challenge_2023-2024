import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("Connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"announcements",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        isConnected = true;

        console.log("Connection Established");
    }catch(error){
        console.log(error);
    }
} 
