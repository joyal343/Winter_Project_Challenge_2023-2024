import { connectToDB } from "@utils/database";
import Post from '@models/post3';

export const GET = async (req)=>{
    try {
        await connectToDB();
        const posts = await Post.find({});
        return new Response(JSON.stringify(posts),{status:200});

    } catch (err) {
        console.log(err);
    }
}

export const DELETE =async (req)=>{
    try{
        await connectToDB();
        const {id} = await req.json();
        const user = await Post.deleteOne({_id:id});
        return new Response(JSON.stringify(user),{status:200})
    }
    catch(err){
        console.log(err);
    }
}