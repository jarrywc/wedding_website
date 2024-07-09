'use client'
import React, {Context, createContext, useContext, useState} from "react";
import { User } from '@/types'

export const UserContext: Context<any> = createContext(null);

export default function UserProvider({children}:{children: React.ReactNode}){
    const [activeUser, setActiveUser] = useState<User|null>(null)
    return (
        <UserContext.Provider value={{activeUser, setActiveUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext () {return useContext(UserContext);}
export const UserConsumer = UserContext.Consumer