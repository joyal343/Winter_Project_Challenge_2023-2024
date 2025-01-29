import { connectToDB } from "@utils/database";
import Post from '@models/post3';
import { NextResponse } from "next/server";
import {dirname} from 'path';
import {fileURLToPath} from 'url'
import {writeFile} from 'fs/promises'
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadURL =__dirname.substring(0,__dirname.length - 13)+"\\pdfStore";

export async function POST(req){
    const data = await req.formData();
    console.log(data.get("title"));
    console.log(data.get("desc"));
    console.log(data.get("type"));
    console.log(data.get("dept"));
    const file = data.get('file');
    console.log(file);
    
    if(!file || !file.size){
        console.log("SIDE PATH")

        await connectToDB();
        const newPost = new Post({
            title:data.get("title"),
            // date: new Date(),
            date: data.get("date"),
            desc:data.get("desc"),
            annType:data.get("type"),
            annDept:data.get("dept"),
            picture:""
        })  
        await newPost.save();
        return NextResponse.json({success:true})
    }

    // Save File to File System
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileId = uuidv4()
    await writeFile(uploadURL+"\\" + fileId +".pdf",buffer);

    // Connect to DB and Write Post
    await connectToDB();
    const newPost = new Post({
    title:data.get("title"),
    date:new Date(),
    desc:data.get("desc"),
    annType:data.get("type"),
    annDept:data.get("dept"),
    picture:fileId+".pdf",
    })

    // Commit To DB and Send Response
    await newPost.save();
    return NextResponse.json({success:true});

}
