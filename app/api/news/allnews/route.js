import { PrismaClient } from '@prisma/client'

export const GET = async (req)=>{
    try {
        const prisma = new PrismaClient();
        const posts = await prisma.record.findMany();
        prisma.$disconnect();
        return new Response(JSON.stringify(posts),{status:200});

    } catch (err) {
        console.log(err);
    }
}

export const DELETE = async (req)=>{
    try{
        const prisma = new PrismaClient();
        const {id} = await req.json();
        const user = await prisma.record.delete({
            where:{
                id:id
            }
        });
        return new Response(JSON.stringify(user),{status:200})
    }
    catch(err){
        console.log(err);
    }
}