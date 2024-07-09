import {CFP_COOKIE_KEY, CFP_COOKIE_MAX_AGE, CFP_URL} from '@/lib/constants';
import {NextRequest, NextResponse} from "next/server";
import {decrypt, encrypt} from "@/app/action";
export const runtime = 'edge';

// const backEndPassword: string = "1234"//process.env.CFP_PASSWORD
// export async function POST(request: NextRequest): Promise<Response> {
//     const cookie = request.headers.get('cookie') || '';
//     const cook = await request.cookies.get(CFP_COOKIE_KEY)?.value
//
//     const cookieKeyValue = `${CFP_COOKIE_KEY}=${``}`
//     return Response.json(
//         ''
//         , {
//             status: 302,
//             headers: {
//                 'Set-Cookie': `${cookieKeyValue}; Max-Age=0; Path='/'; HttpOnly; Secure`,
//                 'Cache-Control': 'no-cache',
//                 // Location: redirectPath,
//                 contentType: 'application/json'
//             },
//         });
//
// }

export async function GET(request: NextRequest): Promise<Response>  {
    const cook = await request.cookies.get(CFP_COOKIE_KEY)?.value
    const userDecrypt = await decrypt(cook)

    // --- User is Authorized ---
    if (userDecrypt?.auth) {
        const res = new NextResponse(
            '', {
                status: 200,
                headers: { 'Set-Cookie': `${CFP_COOKIE_KEY}=${null}` },
            }
        )
        res.cookies.delete(CFP_COOKIE_KEY)
        return res
    }

    else {
        // No cookie or incorrect hash in cookie. Redirect to login.
        return NextResponse
            .redirect(new URL('/login',request.url))    }

}