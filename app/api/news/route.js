import { connectToDB } from "@utils/database";
import Post from '@models/post3';
import { NextResponse } from "next/server";
import {dirname} from 'path';
import {fileURLToPath} from 'url'
import {writeFile} from 'fs/promises'
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadURL =__dirname.substring(0,__dirname.length - 13)+"\\uploads";
export const POST = async (req)=>{
    // GET FORM DATA
    const data = await req.formData();
    const file = data.get('file');
    if(!file){
        console.log("SIDE PATH")
        const newPost = new Post({
            title:data.get("title"),
            date: new Date(),
            desc:data.get("desc"),
            annType:data.get("type"),
            annDept:data.get("dept"),
        })  
        await newPost.save();
        return NextResponse.json({success:false})
    }
    // GET BUFFER
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // GET ID
    const idFile = fs.readFileSync(uploadURL+"\\id.txt");
    var id=Number(idFile[0]);
    id++;
    // CREATE FILE
    fs.writeFileSync(uploadURL+"\\id.txt",id.toString());
    await writeFile(uploadURL+"\\"+id+file.name,buffer);
    // CONNECT TO DB
    await connectToDB();
    // CREATE POST
    const newPost = new Post({
    title:data.get("title"),
    date:new Date(),
    desc:data.get("desc"),
    annType:data.get("type"),
    annDept:data.get("dept"),
    picture:id+file.name,
    })
    // SAVE TO DB
    await newPost.save();
    return NextResponse.json({success:true});

}
