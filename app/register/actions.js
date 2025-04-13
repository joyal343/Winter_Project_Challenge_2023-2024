"use server";
import { createSession, deleteSession} from "../lib/sessions";
import { z } from "zod";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client'   

// Define the schema for the login form Validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  name: z.string().min(4, { message: "Name is required" }).trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});


export async function handleRegister(prevState, formData) {
  // Form Data Validation 
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) 
    return { errors: result.error.flatten().fieldErrors,};
  
  // Authenticate User
  console.log("server action register", formData.get("email"), formData.get("password"))
  
  try {
    const prisma = new PrismaClient()
    await prisma.user.create({
      data:{
        email:formData.get("email"),
        name:formData.get("name"),
        password:formData.get("password")
      }
    })
    prisma.$disconnect()
  } catch (error) {
    return {
      errors: {
        email: ["Email may already exist"]
      },
    }
  }
  
  const user = { email: formData.get("email"), name: formData.get("name") };
  
  // Create the session
  await createSession(user, formData.get("name"));

  return { success: true };
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}


export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

