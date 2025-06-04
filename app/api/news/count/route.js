const { PrismaClient } = require('@prisma/client');
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

async function getRecordCounts() {
  const totalRecords = await prisma.record.count();

  const recordsWithFileLocation = await prisma.record.count({
    where: {
      fileLocation: {
        not: null,
      },
    },
  });

  return {
    totalRecords,
    recordsWithFileLocation,
  };
}

export async function GET(request) {
    try {
        const counts = await getRecordCounts();
        return new Response(JSON.stringify(counts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        });
    } catch (error) {
        console.error('Error fetching record counts:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

