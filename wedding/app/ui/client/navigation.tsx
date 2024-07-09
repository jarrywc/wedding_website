"use client"
import React, {useEffect, useState} from 'react';
import HomeIcon  from '../server/home-icon'
import { usePathname } from 'next/navigation'
import navigation from '@/app/dataTemplates/navigation.json'
import * as Icons from "react-icons/fa";
import UserClient, {useUser} from "@/app/ui/client/user";

import {User, UserMinimal} from "@/types";
import {LogoutForm} from "@/app/ui/client/auth";
import {WEDDING_NAVIGATION} from "@/lib/constants";


export const DynamicFaIcon = ({ name, path }:{name: string, path: string}) => {
    const pathname = usePathname()
    //@ts-ignore
    const IconComponent = Icons[`Fa${name}`];
    if (!IconComponent) { // Return a default one
        return (
            <span className={pathname === `${path}`?`visible`:`is-hidden`}>
                <Icons.FaBeer  />
            </span>
        );
    }
    return (
        <span className={pathname === `${path}`?`visible`:`is-hidden`}>
            <IconComponent  />
        </span>
    )
};

type NavItemObj = {
    "path": string, "title": string,
    "description": string, "icon": string,
    "access": number
}

function NavItem({props}:{props: any}){
    const pathname = usePathname()
    const { path, title, icon, access }: NavItemObj = props
    return(
        <a className={`navbar-item has-text-centered p-0 ${pathname === `${path}`?`is-active`:``}`} href={`${path}`}>
            <DynamicFaIcon name={icon}  path={`${path}`} />
            <span className={`p-1`}>{title}</span>
        </a>
    )
}


function NavList(){

    const [navList, setNavList] =
        useState<NavItemObj[]|null>(null)

    useEffect(() => {
        let navStr:string|null = localStorage.getItem(WEDDING_NAVIGATION)
        if (navStr!=null){
            const nav: NavItemObj[] | null = JSON.parse(navStr)
            setNavList(nav)
            console.log(`Navlist: ${JSON.stringify(navList)}`)
        }

    }, []);

    return (
        <>
            {
                navList?.map(
                    (page: any) => <NavItem props={page} />
                )
            }
        </>
    )
}
// export function PublicNavigation(){
//     return (<NavList access='public' />)
// }
// export function GuestNavigation(){
//         return (
//             <>
//                 {/*<PublicNavigation />*/}
//                 <NavList access=['guest'] />
//             </>)

export function UserLogin(){

    const {user}:{user: UserMinimal} = useUser();

    return(
        <>
        { user ?
            <>
                <hr className="navbar-divider is-hidden-tablet"/>
                <a className="navbar-item is-hidden-tablet has-text-centered">
                    <div className={`columns`}>
                    <span className={`column pb-3`}>
                        <UserClient/>
                    </span>
                        <span className={`column pt-0`}>
                        <LogoutForm/>
                    </span>
                    </div>
                </a>
                <div className={`navbar-item p-0 has-dropdown is-hoverable is-hidden-touch`}>
                    {/*${true!=null?``:`*/}
                    <a className="navbar-link">
                        <Icons.FaRegUserCircle/>
                    </a>
                    <div className="navbar-dropdown">
                        <a className="navbar-item mb-1 pb-1">
                            <UserClient/>
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item p-0 pt-0 mt-0 pb-1">
                            <LogoutForm/>
                        </a>
                    </div>
                </div>
            </>:<></>}
        </>
    )
}


export default function Navigation() {
    const [openBasic, setOpenBasic] = useState(false);

    return (
        <>
            <nav className='navbar is-spaced fixed w-full '
                 role={`navigation`}
                 style={{opacity: "90%"}}
                id="navbar-sticky">
                <div className='navbar-brand'>
                    <a href="/" className="navbar-item flex">
                        <HomeIcon size={30} />
                    </a>
                    <a onClick={()=>setOpenBasic(!openBasic)}
                       role="button"
                       className={`navbar-burger burger ${openBasic ? 'is-active' : ''}\``}
                       aria-label="menu" aria-expanded="false"
                       data-target="main-nav">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>
                <div id="main-nav"
                     className={`navbar-menu ${openBasic ? 'is-active' : ''}`}
                     aria-label={`main navigation`}>

                    <div className="navbar-center">
                        <NavList />
                        <UserLogin />
                    </div>
                </div>
            </nav>
        </>
    );
}