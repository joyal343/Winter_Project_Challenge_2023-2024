import 'server-only';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "secrethsdvhkbsfvuawlcadklvsjlhgebk3787823";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("6000 sec from now")
        .sign(key);
}

export async function decrypt(input) {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export async function createSession(user,name) {
    const expires = new Date(Date.now() + 100 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    const c = await cookies();
    c.set("session", session, { expires, httpOnly: true });
    c.set("session_active", "true", { expires, });
    c.set("user_name", name, { expires, });
    
}

export async function deleteSession() {
    const c = await cookies();
    c.delete("session");
    c.delete("session_active");
    c.delete("user_name");
  }