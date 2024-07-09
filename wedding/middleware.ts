import {CFP_ALLOWED_PATHS, CFP_COOKIE_KEY, CFP_COOKIE_MAX_AGE} from '@/lib/constants';
import {NextRequest, NextResponse} from "next/server";
import {decrypt, encrypt} from "@/app/action";

export default async function middleware(request: NextRequest): Promise<Response> {
    // const { setActiveUser, activeUser } = useContext(UserContext)
    // const { request, next, env } = context;
    const { pathname } = new URL(request.url);


    // const { error } = Object.fromEntries(searchParams);
    const cookie = request.headers.get('cookie') || '';
    // console.log(cookie.valueOf())

    const cook = await request.cookies.get(CFP_COOKIE_KEY)?.value
    // const cookieKeyValue = await getCookieKeyValue(pass);

    const userDecrypt = await decrypt(cook)

    // cookie.includes(cookieKeyValue)
    // console.log(`Decrypt: ${userDecrypt?.userId}`)

    // --- User is Authorized ---
    if (userDecrypt?.auth) {
        // Update Session Expiration
        userDecrypt.expires = new Date(Date.now() + 10 * 10000000)
        const userEncrypt = await encrypt(userDecrypt)
        const cookieKeyValue = `${CFP_COOKIE_KEY}=${userEncrypt}`
        const refreshedInit = {
            headers: {
                'Set-Cookie': `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path='/'; HttpOnly; Secure`,
                'Cache-Control': 'no-cache',
            }}
        // if(pathname==="/"){
        //     return NextResponse
        //         .redirect(new URL('/wedding',request.url),refreshedInit)
        // }
        const res = NextResponse.next(refreshedInit);
        res.cookies.set(
            {name: CFP_COOKIE_KEY,
                value: await encrypt(userDecrypt),
                httpOnly: true,
                expires: userDecrypt.expires,
            }
        )
        return res
    }
    // else if (pathname === '/'){
    //     return NextResponse
    //         .redirect(new URL('/wedding',request.url))
    // }
    else {
        // No cookie or incorrect hash in cookie. Redirect to login.
        return NextResponse
           .redirect(new URL('/login',request.url))    }
}


// export default async function middleware(request: NextRequest){
//     return await updateSession(request)
// }
// export async function middleware(request: NextRequest) {
//     return await authMiddleware(request)
// }
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|savethedate.png|login|cfp_login).*)',
    ],
}