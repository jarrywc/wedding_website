'use server'
import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
// import {number} from "prop-types";
import {LoginCredentials} from "@/types";
// import {strict} from "node:assert";
// import {wait} from "@apollo/client/testing";
import {CFP_COOKIE_KEY, CFP_COOKIE_MAX_AGE} from "@/lib/constants";
import {User} from "@/types";

const secretKey = process.env.SECRET_KEY || "secretkeyyoudontknow";
const keyEntry = new TextEncoder().encode(secretKey);

const myURL = process.env.MYURL

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(new Date(Date.now() +  10 * 10000000) )
        .sign(keyEntry);
}

export async function decrypt(input?: string | null): Promise<any> {
    if (!input){
        return null
    }
    try{
        const verify = await jwtVerify(input, keyEntry, {
            algorithms: ["HS256"],
        });
        const { payload } = verify;
        return payload;
    } catch (e){
        console.log(e)
        return null
    }

}



export async function login({phoneNumber}: LoginCredentials) {
    // LOOK FOR USER EXISTENCE IN DB
    // const usrs = await Collection({
    //     targetDatabase: "wedding",
    //     targetCollection: "User"
    // })
    // const user = await usrs?.findOne({phone: phoneNumber})
    let user: User = { name: "Test", phone: phoneNumber, _id: "25325"}
    const {_id} = user

    // Create the session
    const expires = new Date(Date.now() + 10 * 100000);
    const session = await encrypt({ _id, expires });
    // const response = new Response(JSON.stringify({ session }), {
    //     headers: { "Content-Type": "application/json" },
    // })
    // Save the session in a cookie
    const cookieStore = cookies();
    cookieStore.set("session", session, { expires, httpOnly:  true });
    //cookies().set("phone", phoneNumber, {secure: true})

    return JSON.stringify(user)
}

export async function oldlogin(formData: FormData) {
    const user = String(formData?.get("phone"));
    // Create the session
    const expires = new Date(Date.now() + 10 * 100000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    //cookies().set("phone", phoneNumber, {secure: true})
}

// export async function loginTwo({phoneNumber}: LoginCredentials) {
//     const user = phoneNumber;
//     // Create the session
//     const expires = new Date(Date.now() + 10 * 100000);
//     const session = await encrypt({ user, expires });
//     // const newCookie = `${key}=${user}; path=${myURL}/api/login; secure; HttpOnly; SameSite=Strict`
//     // const response = new Response(JSON.stringify({ session }), {
//     //     headers: { "Content-Type": "application/json" },
//     // })
//     // Save the session in a cookie
//     const parsed = await decrypt(session);
//     parsed.expires = new Date(Date.now() + 10 * 100000);
//
//     const cookieStore = cookies();
//     cookieStore.set({
//         name: "session",
//         value: await encrypt(parsed),
//         httpOnly: true,
//         expires: parsed.expires,
//
//     });
//     //cookies().set("phone", phoneNumber, {secure: true})
// }

// export async function oldlogin(formData: FormData) {
//     const phoneNumber:string = String(formData?.get("phone"))
//
//     const user = phoneNumber;
//
//     // Create the session
//     const expires = new Date(Date.now() + 10 * 1000);
//     const session = await encrypt({ user, expires });
//
//     // Save the session in a cookie
//     cookies().set("session", session, { expires, httpOnly: true });
//     //cookies().set("phone", phoneNumber, {secure: true})
// }

export async function logout() {
    // Destroy the session
    cookies().delete(CFP_COOKIE_KEY);
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    console.log('GetSession Triggered')
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return NextResponse.redirect(new URL('/login',request.url));

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 100000); //CFP_COOKIE_MAX_AGE
    console.log(`Session: ${parsed.session}`)
    const newCookie = `session=${parsed.session}; path=${myURL}/login; secure; HttpOnly; SameSite=Strict`
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,

    });
    //         expires: parsed.expires,
    res.headers.set("Set-Cookie", session);
    return res;
}