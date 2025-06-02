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