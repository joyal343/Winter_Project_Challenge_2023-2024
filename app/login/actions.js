"use server";
import { createSession, deleteSession} from "../lib/sessions";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

// Define the schema for the login form Validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});


export async function handleLogin(prevState, formData) {
  console.log("server action")
  // Form Data Validation 
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  
  // Authenticate User
  console.log("server action", formData.get("email"), formData.get("password"))

  if (formData.get("email") !== "admin@email.com" || formData.get("password") !== "admin") {

    return {
      errors: {
        email: ["Invalid username or password"]
      },
    }
  }

  const user = { email: formData.get("email"), name: "John" };
  

  // Create the session
  await createSession(user);

  // Redirect to the admin dashboard
  redirect("/admin/posts");
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

