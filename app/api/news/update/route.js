import { PrismaClient } from '@prisma/client'

export const POST = async (req) => {
    try {
        const { id } = await req.json();
        console.log(id)
        const prisma = new PrismaClient();
        const post = await prisma.record.findUnique({
            where: { id: id }
        });
        await prisma.$disconnect();
        return new Response(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('Error fetching record', { status: 500 });
    }
}
