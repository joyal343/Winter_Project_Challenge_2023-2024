import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const filePath = path.join(process.cwd(), "public", "sample-file.ext"); // Change the file path accordingly
    console.log(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": "attachment; filename=sample-file.ext",
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    return new NextResponse("File not found", { status: 404 });
  }
}
