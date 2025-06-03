import fs from "fs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()
     
 export async function POST(req){
try {
    const { id } = await req.json();
    
    const post = await prisma.record.findUnique({
        where: { id: id },
    });
    
    const filePath = post.fileLocation
    const fileBuffer = fs.readFileSync(filePath);
    
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename=${id}.pdf` ,
       "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error fetching file:", error); 
    return new NextResponse("File not found", { status: 404 });
  }
}
