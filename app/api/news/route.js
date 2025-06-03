
import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";
import path from 'path';
import {writeFile} from 'fs/promises'
import { v4 as uuidv4 } from 'uuid';

// Create a new post
export async function POST(req){
    const data = await req.formData();
    const file = data.get('file');
    const img = data.get('img');
    

    // Connect to DB
    const prisma = new PrismaClient()
    const record = {data:{
        title:data.get("title"),
        description:data.get("desc"),
        type:data.get("type"),
        department:data.get("dept"),
    }}

    if (file && file.size) {
        const fileBytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileBytes);
        const fileLocation = path.join(process.cwd(), "public", "pdfStore", uuidv4() + ".pdf");
        await writeFile(fileLocation, fileBuffer);
        record.data.fileLocation = fileLocation;
    }
    
    if (img && img.size) {
        const imgBytes = await img.arrayBuffer();
        const imgBuffer = Buffer.from(imgBytes);
        const imgLocation = path.join(process.cwd(), "public", "imageStore", uuidv4() + path.extname(img.name));
        await writeFile(imgLocation, imgBuffer);
        record.data.imageLocation = `/imageStore/${path.basename(imgLocation)}`;
    }
 
    await prisma.record.create(record)
    prisma.$disconnect()

    return NextResponse.json({success:true});

}

// Delete post by ID
export const DELETE = async (req)=>{
    try{
        const prisma = new PrismaClient();
        const {id} = await req.json();
        const user = await prisma.record.delete({
            where:{ id : id }
        });
        return new Response(JSON.stringify(user),{status:200})
    }
    catch(err){
        console.log(err);
    }
}

// Update post by ID 

export const PUT = async (req) => {
    try {
        const data = await req.formData();
        const file = data.get('file');
        const img = data.get('img');
        const id = data.get('id');
        // Connect to DB   
        const prisma = new PrismaClient()
        const recordData = {
            title:data.get("title"),
            description:data.get("desc"),
            type:data.get("type"),
            department:data.get("dept"),
        }
        
        if (file && file.size) {
            const fileBytes = await file.arrayBuffer();
            const fileBuffer = Buffer.from(fileBytes);
            const fileLocation = path.join(process.cwd(), "public", "pdfStore", uuidv4() + ".pdf");
            await writeFile(fileLocation, fileBuffer);
            recordData.fileLocation = fileLocation;
        }
            
        if (img && img.size) {
            const imgBytes = await img.arrayBuffer();
            const imgBuffer = Buffer.from(imgBytes);
            const imgLocation = path.join(process.cwd(), "public", "imageStore", uuidv4() + path.extname(img.name));
            await writeFile(imgLocation, imgBuffer);
            recordData.imageLocation = `/imageStore/${path.basename(imgLocation)}`;
        }
    
    
        
        const updatedRecord = await prisma.record.update({
            where: { id },
            data: recordData
        });
        await prisma.$disconnect();
        return new Response(JSON.stringify(updatedRecord), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('Error updating record', { status: 500 });
    }
} 