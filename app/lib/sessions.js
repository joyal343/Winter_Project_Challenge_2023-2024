import 'server-only';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
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

export async function createSession(user) {
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    const c = await cookies();
    c.set("session", session, { expires, httpOnly: true });
    
}

export async function deleteSession() {
    const c = await cookies();
    c.delete("session");
  }