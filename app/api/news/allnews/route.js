import { connectToDB } from "@utils/database";
import Post from '@models/post2';

export const GET = async (req)=>{
    try {
        await connectToDB();
        const posts = await Post.find({});
        return new Response(JSON.stringify(posts),{status:200});

    } catch (error) {
        console.log(error);
    }
}