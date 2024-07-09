import {CFP_COOKIE_KEY, CFP_COOKIE_MAX_AGE, CFP_URL} from '@/lib/constants';
import {NextRequest} from "next/server";
import {Collection} from "@/lib/realm_tools";
import {decrypt} from "@/app/action";
import {InsertedId, RSVP, User, UserReduce} from "@/types";
import {BSON} from "realm-web";
import {object} from "prop-types";

export const runtime = 'edge';

// const backEndPassword: string = "1234"//process.env.CFP_PASSWORD
export async function GET(request: NextRequest): Promise<Response> {
    // FIND USER USING COOKIE
    const cookie = request.headers.get('cookie') || '';
    // console.log(cookie.valueOf())
    const cook = await request.cookies.get(CFP_COOKIE_KEY)?.value
    const userDecrypt = await decrypt(cook)
    const userId = userDecrypt?.userId

    if (userId != null) {
        // console.log(`Decrypt: ${userId}`)


        const users = await Collection({
            targetDatabase: "wedding",
            targetCollection: "User"
        })
        // const user: User = await users?.findOne({_id: new BSON.ObjectId(userId)})
        // const userGroup = user?.groupId
        const userGroup = userDecrypt.groupId
        console.log(`\nRSVP:: User GroupId: ${JSON.stringify(userGroup)}\n`)
        // Use this user's group to find all members

        let usersInGroup = await users?.find({groupId: userGroup})
        let usersReduce = usersInGroup?.map((
            {phone, email, group, groupId,
                table, tableId, comment, organizer,
                createdAt, updatedAt, ...object}
        )=> object)



        // const userEncrypt = await encrypt({userId: userId, auth: true})
        const userInGroupStr = JSON.stringify(usersInGroup)
        console.log(`\n\nRSVP:: USERS ON API: ${userInGroupStr}\n\n`)
        const usersReduceStr = JSON.stringify(usersReduce)
        console.log(`\n\nRSVP:: USERS REDUCED: ${usersReduceStr}\n\n`)

        const cookieKeyValue = `${CFP_COOKIE_KEY}=${cook}`//await getCookieKeyValue(backEndPassword);

        return Response.json(
            usersReduce
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

export async function POST(request: NextRequest): Promise<Response> {
    // FIND USER USING COOKIE
    // const cookie = request.headers.get('cookie') || '';
    console.log(`\n\nRSVP:: Post:: ${request}`)
    const cook = request.cookies.get(CFP_COOKIE_KEY)?.value
    const userDecrypt = await decrypt(cook)
    const userId = userDecrypt?.userId

    if (userId != null) {
        console.log(`Decrypt UserId: ${userId}`)
        const rsvpUsers: UserReduce[] = await request.json()
        console.log(`RSVP UserReduce []: ${JSON.stringify(rsvpUsers)}`)
        const rsvpFormUserIds
            = rsvpUsers?.map((
            {name, type, ...object}
        )=> object)
        console.log(`FORM IDS: ${JSON.stringify(rsvpFormUserIds)}`)
        const rsvpFormUserIdsAttending =
            rsvpFormUserIds.filter( (user) => user.attending )
        console.log(`FORM IDS ATTENDING: ${JSON.stringify(rsvpFormUserIdsAttending)}`)
        const rsvpUserIdsFinal =
            rsvpFormUserIdsAttending?.map((
            {attending, ...object}
        )=> object).map(
                ({_id})=> _id.valueOf()
            )
        console.log(`FORM IDS FINAL: ${JSON.stringify(rsvpUserIdsFinal)}`)

        const users = await Collection({
            targetDatabase: "wedding",
            targetCollection: "User"
        })
        const user: User = await users?.findOne({_id: new BSON.ObjectId(userId)})

        // @ts-ignore
        let rsvpForm= {
            groupId: user?.groupId,
            userId: user?._id,
            usersAttending: rsvpUserIdsFinal,
        }
        const rsvpFormStr = JSON.stringify(rsvpForm)
        console.log(`RSVP FORM TO SEND ${rsvpFormStr}`)

        const rsvps = await Collection({
            targetDatabase: "wedding",
            targetCollection: "RSVP"
        })
        const rsvpId: InsertedId|undefined = await rsvps?.insertOne(rsvpForm)
        console.log(`Realm - RSVP ID: ${JSON.stringify(rsvpId)}`)
        let rsvpSubmitted = { _id: rsvpId?.insertedId, ...rsvpForm}

        console.log(`SUBMIT: ${JSON.stringify(rsvpSubmitted)}`)

        if (rsvpSubmitted) {
            // RSVP Logged, now we mutate the Users
            console.log(`Updating Users`)

            for (const userPerson of rsvpUsers) {
                // new BSON.ObjectId(form._id)
                console.log(`Updating User: ${userPerson.name} - ${userPerson._id} attending: ${userPerson.attending} `)
                let userRsvp = await Collection({
                    targetDatabase: "wedding",
                    targetCollection: "User"
                })
                let result = await userRsvp?.updateOne(
                    {_id: new BSON.ObjectId(userPerson._id) },
                    { $set: { attending: userPerson.attending}})
                console.log(`RSVP Users Updated: ${JSON.stringify(result)}`)
            }

            let usersInGroup = await users?.find({groupId: user.groupId})
            let usersReduce = usersInGroup?.map((
                {phone, email, group, groupId,
                    table, tableId, comment, organizer,
                    createdAt, updatedAt, ...object}
            )=> object)


        const cookieKeyValue = `${CFP_COOKIE_KEY}=${cook}`//await getCookieKeyValue(backEndPassword);

        return Response.json(
            usersReduce
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