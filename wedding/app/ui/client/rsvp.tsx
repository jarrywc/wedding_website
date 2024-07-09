'use client'
import React, {FormEvent, useEffect, useState} from "react";
import {GUEST_STORAGE_KEY} from "@/lib/constants";
import {User, UserReduce} from "@/types";
import FormButton from "@/app/ui/client/buttons";
import useSWR from 'swr'
import {useUser} from "@/app/ui/client/user";


let hogue_db: UserReduce[] = [
    { name: "Test", attending: true,  _id: "1", type: 1},
    { name: "TestB", attending: false, _id: "2", type: 1}
]

const fetcher = (url: string) => fetch(url).then(r => r.json())

function useGroup () {

    const { data, error, isLoading } :
        {data: UserReduce[]|any, error: any, isLoading: boolean} = useSWR('/api/rsvp', fetcher,  { refreshInterval: 10000000 })

    return (
        {
            guest: data,
            isLoading: isLoading,
            isError: error
        }
    )
}

// function debounce(callback, delay) {
//     let timeoutId;
//
//     return function() {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(callback, delay);
//     }
// }

// <div className='column'>
//                 //     <div className={`pb-2 box has-text-centered`}>
//                 //         <h4 className='title is-4'>
//                 //             RSVP{user?` - ${user.groupName}`:``}
//                 //         </h4>
//                 //         <div className={`container is-multiple is-medium`}>
//                 //             {isLoading?<progress className={`progress is-large is-info`} max="100">40%</progress>:
                //                 <form
                //                 onSubmit={onSubmit}
                //                 // action={()=>onSubmit}
                //             >

                //                 {isError?`Error Loading RSVP Information`:``}
                //                 {
                //                     guests?.map((guest: User, index: number) =>
                //                         <div className={`form-check`}>
                //                             <div
                //                                 className={`pl-4`}>
                //                                 <div className={`columns is-variable is-gapless is-mobile`}>
                //                                     <div
                //                                         className={`column has-text-left subtitle pb-2`}>
                //                                         <label htmlFor={guest._id}>{guest.name}</label>
                //                                     </div>
                //                                     <div
                //                                         className={`column has-text-right is-one-quarter`}>
                //                                         <input
                //                                             className={`title is-4`}
                //                                             type="checkbox"
                //                                             value={guest._id}
                //                                             style={{
                //                                                 width: '30px',
                //                                                 height: '30px'

                //                                             }}
                //                                             checked={guest.attending}
                //                                             onChange={e => {
                //                                                 handleGuestList(index)
                //                                             }}
                //                                             name={`${index}`}
                //                                             id={guest._id}
                //                                             key={index}
                //                                         />

                //                                     </div>
                //                                 </div>

                //                             </div>
                //                         </div>
                //                     )}
                //                 </form>}
                //         </div>
                //     </div>
                // </div>



export default function GuestGroup () {

    const { guest, isError, isLoading } = useGroup()

    const { user }  = useUser()

    const [guests, setGuests] = useState<User[]|any>()

    async function onSubmit(event: FormEvent<HTMLFormElement>){
        console.log(`SUBMIT RSVP`)
        event.preventDefault()
        // const formData: FormData = new FormData(event.currentTarget)
        // const plainFormData = Object.fromEntries(formData.entries());
        const response: Response = await fetch(`/api/rsvp`,
            {
                method: "POST",
                body: JSON.stringify(guests)
            })
        const re: UserReduce = await response.json()
        if (response.status != 302){
            console.log(`Couldn't submit`)
        }
        setGuests(re)
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guests))
    }

    function handleGuestList(index: number) {
        const updateGuests = guests.map(
            (guest:User, i:number) => {
                if (i == index){
                    return { ...guest, attending: !guest.attending}
                } else {
                    return { ...guest}
                }
            }
        )
        setGuests(updateGuests);
        // setGuests(
        //     (prevGuests: User[]) =>{
        //         return prevGuests.map(
        //             (guest:User) => {
        //                 if (guest.name == name){
        //                     return { ...guest, attending: attending}
        //                 } else {
        //                     return { ...guest}
        //                 }
        //             }
        //         )
        //     }
        // )
    }

    async function getGroupMembers () {
        let guestList = localStorage.getItem(GUEST_STORAGE_KEY)
        if(!guestList){
           const response = await fetch('/api/rsvp',
               { method: "GET" }
           )
           if (response.status != 302 ){
               console.log(`Failed`)
               localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guests))
               setGuests(hogue_db)
               // throw new Error('Failed to submit the data. Please try again.')
           }
           else {
               // Use the working data
               const guestList: User[] = await response.json()
               console.log(`DATA: ${JSON.stringify(guestList)}`)
               localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestList))
               setGuests(guestList)
           }
       } else {
            setGuests(JSON.parse(guestList))
        }
    }
    useEffect(() => {
        getGroupMembers()
    }, []);

    return (
        <>
            <div className={`columns`}>
                
                <div className='column '>
                    <div className={`pb-2 box has-text-centered`}>
                        <h4 className='title is-4'>
                            Your Guests Attending
                        </h4>
                        <div className={``}>
                            {isLoading ? `Loading...` :
                                guests?.filter((guest: User) => guest.attending).map((guest: User) =>
                                    <div className={`container p-1`}>
                                        <div className={`card m-2`}>
                                            <div className={`card-content subtitle is-4`}>
                                                {guest.name}
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                        {/*<div className={`subtitle`}>*/}
                        {/*    <FormButton*/}
                        {/*        buttonLabel={'Send RSVP'}*/}
                        {/*        buttonType={'submit'}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

        </>
    )

}