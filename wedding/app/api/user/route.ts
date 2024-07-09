import {CFP_COOKIE_KEY, CFP_COOKIE_MAX_AGE, CFP_URL} from '@/lib/constants';
import {NextRequest} from "next/server";
import {decrypt} from "@/app/action";
import {Collection} from "@/lib/realm_tools";
import {User, UserMinimal} from "@/types";
import {BSON} from "realm-web";
export const runtime = 'edge';

// const backEndPassword: string = "1234"//process.env.CFP_PASSWORD
export async function GET(request: NextRequest): Promise<Response> {
    // const cookie = request.headers.get('cookie') || '';
    const cook = request.cookies.get(CFP_COOKIE_KEY)?.value
    const userDecrypt = await decrypt(cook)
    const userId = userDecrypt?.userId || null
    const auth = userDecrypt?.auth
    const userName = userDecrypt?.userName || null
    const userGroup = userDecrypt?.groupId || null
    const groupName = userDecrypt?.groupName || null
    const userType = userDecrypt?.type || null

    const user: UserMinimal = {
        userName: userName,
        userId: userId,
        groupId: userGroup,
        groupName: groupName,
        userType: userType

    }
    console.log(`User ID from Cookie is ${userId} and auth is ${auth}`)
    // const users = await Collection({
    //     targetDatabase: "wedding",
    //     targetCollection: "User"
    // })
    // const user: User = await users?.findOne({_id: new BSON.ObjectId(userId)})

    console.log(`USER COLLECTED---- ${userName}`)


    if (userId != null) {
        const userStr = JSON.stringify(user)
        const cookieKeyValue = `${CFP_COOKIE_KEY}=${cook}`//await getCookieKeyValue(backEndPassword);
        console.log(`USER ON API: ${userStr}`)

        return Response.json(
            user
            , {
                status: 302,
                headers: {
                    'Set-Cookie': `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path='/'; HttpOnly; Secure`,
                    'Cache-Control': 'no-cache',
                    // Location: redirectPath,
                    contentType: 'application/json'
                },
            });
    } else {
        return new Response('', {
            status: 302,
            headers: {
                'Cache-Control': 'no-cache',
                Location: `${CFP_URL}?error=1`
            }
        });
    }

}