// NOT IMPLEMENTED
import {getSession} from "@/app/action";
import {LogoutForm} from "@/app/ui/client/auth";

export async function SessionInfo()  {
    const session = await getSession();
    return (<pre>{JSON.stringify(session, null, 2)}</pre>)

}

export async function SessionNavUserName(){
    const session = await getSession();
    if (session !== null){
        return (session.user.name )
    }
    return null;
}

export async function SessionNavLogout(){
    return (<><LogoutForm /> </>)
}

export async function SessionContextData(){
    const session = await getSession();
    return (session)
}

// export async function MongoTest(){
//
// }