import {CFP_COOKIE_KEY, CFP_COOKIE_MAX_AGE, CFP_URL} from '@/lib/constants';
import {NextRequest} from "next/server";
import {Collection} from "@/lib/realm_tools";
import {encrypt} from "@/app/action";
import navigation from "@/app/dataTemplates/navigation.json";
import React from "react";

export const runtime = 'edge';

export async function POST(request: NextRequest): Promise<Response> {
    const body = await request.formData();
    const { password } = Object.fromEntries(body);
    console.log(password)
    console.log(`User Login Request`)
    const users = await Collection({
        targetDatabase: "wedding",
        targetCollection: "User"
    })
    const user = await users?.findOne({phone: password})
    // console.log(`USER---- ${user?._id}`)
    const userId = user?._id || null
    const groupId = user?.groupId || null
    const userName = user?.name || null
    const groupName = user?.group || null
    const userType = user?.type || null
    const userEncrypt = await encrypt({
        userId: userId, auth: true,
        groupId: groupId, userName: userName,
        groupName: groupName, userType: userType
    })
    // console.log(`Encrypt: ${userEncrypt}`)
     //redirect.toString() || '/';
    if (userId != null) {
        const userStr = JSON.stringify(user)
        const cookieKeyValue = `${CFP_COOKIE_KEY}=${userEncrypt}`//await getCookieKeyValue(backEndPassword);
        console.log(`USER ON API: ${userStr}`)


        const pages = navigation.pages
        // Could use 'public'||'guest' to filter for multiple at once
        // @ts-ignore
        const coreNavItems = pages.filter(
            (page) => {
                return page.access <= userType
            })



        return Response.json(
            coreNavItems
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