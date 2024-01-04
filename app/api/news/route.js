import { connectToDB } from "@utils/database";
import Post from '@models/post2';

export const POST = async (req) =>{
    const {title,date,desc,type,dept} = await req.json();
    console.log(type);
    console.log(dept);

    try {
        await connectToDB();
        const newPost = new Post({
            title:title,
            date:date,
            desc:desc,
            annType:type,
            annDept:dept
        })
        await newPost.save();
        return new Response(JSON.stringify(newPost),{status:201})

    } catch (error) {
        console.log(error)
    }
}
