"use client" // VERY IMPORTANT!

import React from "react";
import dynamic from "next/dynamic";
// import GuestGroup from "@/app/ui/guest";
const GuestGroup = dynamic( () => import('../../ui/client/rsvp'), {ssr: false})
export default function RSVP(){
    return (
        <>

            <div className='container p-1'>
                <h2 className='title is-2 has-text-centered'>RSVP to Wedding</h2>
                <GuestGroup />


                    {/*<div className='box has-text-centered'>*/}
                    {/*    <div className={`pb-2`}>*/}
                    {/*        <h4 className='title is-4'>*/}
                    {/*            RSVP*/}
                    {/*        </h4>*/}
                    {/*        <GuestGroup />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
            </div>

        </>
    )

}