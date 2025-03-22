
import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";
import {dirname} from 'path';
import {fileURLToPath} from 'url'
import {writeFile} from 'fs/promises'
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadURL =__dirname.substring(0,__dirname.length - 13)+"\\pdfStore";

export async function POST(req){
    // Display Data Sent
    const data = await req.formData();
    console.log(data.get("title"));
    console.log(data.get("desc"));
    console.log(data.get("type"));
    console.log(data.get("dept"));
    const file = data.get('file');
    console.log(file);

    // Connect to DB
    const prisma = new PrismaClient()
    
    // When no file is given
    if(!file || !file.size){
        await prisma.record.create({
            data:{
                title:data.get("title"),
                description:data.get("desc"),
                type:data.get("type"),
                department:data.get("dept"),
            }
        })
        prisma.$disconnect()
        return NextResponse.json({success:true})
    }

    // Save File to File System
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileId = uuidv4()
    await writeFile(uploadURL+"\\" + fileId +".pdf",buffer);
 
    await prisma.record.create({
        data:{
            title:data.get("title"),
            description:data.get("desc"),
            type:data.get("type"),
            department:data.get("dept"),
            fileLocation: uploadURL+"\\" + fileId +".pdf"
        }
    })
    prisma.$disconnect()

    return NextResponse.json({success:true});

}
