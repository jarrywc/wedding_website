'use client'
import { useUserContext} from "@/app/providers";
import {User, UserMinimal} from '@/types'
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {DynamicFaIcon} from "@/app/ui/client/navigation";

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useUser () {

    const { data, error, isLoading }:
        {data: UserMinimal|any, error: any, isLoading: boolean} = useSWR('/api/user', fetcher, { refreshInterval: 10000000 })

    return (
        {
            user: data,
            isLoading: isLoading,
            isError: error
        }
    )
}

export default function UserClient(): React.ReactNode{
    const { user, isLoading, isError }  = useUser()

    if (isLoading) return (<>Loading...</>)
    else if (isError) return (
        <>No User</>)
    else return (<>{user?.userName}</>)

}


export function UserLoginLogout(): React.ReactNode{
    const { user, isLoading, isError }  = useUser()

    if (isLoading) return (<>Loading...</>)
    else if (isError) return (
        <>
            <a className={`navbar-item has-text-centered`}
               href={`/login`}>
                <DynamicFaIcon name={`User`} path={`/login`}/>
                <span className={`p-1`}>Login</span>
            </a>
        </>)
    else return (<>{user?.userName}</>)
}

export function UserClientOLD(): React.ReactNode {
    const {activeUser} = useUserContext();
    const [user, setUser] = useState<UserMinimal | null>(null)
    useEffect(
        () => {
            let wedUser = localStorage.getItem('wedding-user')
            if (wedUser){
                let usr : UserMinimal = JSON.parse(wedUser)
                setUser(usr)
            } else {
                setUser({
                    userName: "Not Logged In", userId: "no-id",
                    groupId: "Group Unassigned", groupName: "No Group Name",
                    userType: 1
                })
            }
        }, [activeUser]
    )

    return (<>{user?.userName}</>)
}