"use server";
import { createSession, deleteSession} from "../lib/sessions";
import { z } from "zod";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client'

// Define the schema for the login form Validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});


export async function handleLogin(prevState, formData) {
  // Form Data Validation 
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  // var user

  if (!result.success) 
    return { errors: result.error.flatten().fieldErrors,};
  
  
  console.log("server action login", formData.get("email"), formData.get("password"))
  
  // Authenticate User
  try {
    const prisma = new PrismaClient() 
    const user = await prisma.user.findUnique({
      where:{
        email:formData.get("email")
      }
    })
    prisma.$disconnect()
    console.log("user",user)
    if(!user || user.password !== formData.get("password")){
      return { errors: { email: ["Invalid username or password"] }, }
    }
    const user_token = { email: formData.get("email"), name: "John" };
    await createSession(user_token);
    console.log("redirecting to admin")
    
  } catch (error) {
    console.log("error",error)
    return { errors: { email: [JSON.stringify(error)] }, }
  }
  redirect("/admin/posts");
  // I dont know why put cant redirect in try and catch block
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

