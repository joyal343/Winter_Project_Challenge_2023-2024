import { PrismaClient } from '@prisma/client' 
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { id } = await request.json();
        if (!id) {
            console.log(id)
            console.log("ID is required")
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        

        const announcement = await prisma.record.findUnique({
            where: { id: id },
        });
 
        if (!announcement) 
            return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
        
        return NextResponse.json(announcement, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}