'use client'
import { redirect, useRouter } from "next/navigation";
// import { login, logout } from "@/app/action";
import FormButton from "@/app/ui/client/buttons";
// import {LoginCredentials} from "@/types";
// import {useForm} from "react-hook-form";
import React, {FormEvent, useContext, useState} from "react";
import {UserContext, useUserContext} from "@/app/providers";
import {User} from "@/types";
import {CFP_COOKIE_KEY, GUEST_STORAGE_KEY, WEDDING_NAVIGATION, WEDDING_USER_KEY} from "@/lib/constants";
import {PatternFormat} from "react-number-format";
import {bronze} from "@radix-ui/colors";


export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}


// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//     ({type, ...props}, ref) => {
//         return (
//             <input
//                 type={type}
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                 ref={ref}
//                 {...props}
//             />
//         )
//     }
// )

export function LogoutForm() {
    const { setActiveUser } = useUserContext();
    const action: () => void = async () => {
        await fetch("/api/logout")
        localStorage.removeItem(WEDDING_USER_KEY)
        localStorage.removeItem(GUEST_STORAGE_KEY)
        localStorage.removeItem(WEDDING_NAVIGATION)
        setActiveUser(null)
        redirect("/login");
    };
    // const pattern = new RegExp(/^\d{1,10}$/);
    return (
        <>
            <form
                action={action}
                className={`field`}
            >
                <FormButton buttonLabel={'Logout'} buttonType={'submit'} />
            </form>
        </>
    );
}



export default function LoginFormSession() {
    let router = useRouter();
    const [password, setPassword] = useState('')
    const { setActiveUser } = useContext(UserContext);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData: FormData = new FormData(event.currentTarget)
        const response: Response = await fetch(`/api/login`, {
            method: 'POST',
            // credentials: "same-origin",
            body: formData
        })

        console.log(`Status ${response.status}`)
        if (response.status!=302) {
            console.log(`Failed`)
            throw new Error('Failed to submit the data. Please try again.')
        } else {
            const re: User = await response.json()
            // console.log(`JSON USER: ${re}`)
            setActiveUser(re)
            // Clear out any old items
            localStorage.removeItem(WEDDING_USER_KEY)
            localStorage.removeItem(GUEST_STORAGE_KEY)
            // Reset the navigation
            localStorage.setItem(WEDDING_NAVIGATION ,JSON.stringify(re))
            router.push("/");
        }
    }
    return (
        <>
            <form
                onSubmit={onSubmit}
                className='field has-text-centered'
            >
                {/*<Input  type="tel"*/}
                {/*        placeholder="Phone Number"*/}
                {/*        className="has-text-centered"*/}
                {/*        name="password"*/}
                {/*        value={password}*/}
                {/*        onChange={(e)=> setPassword(e.target.value)}*/}
                {/*        required*/}
                {/*/>*/}
                <PatternFormat format="%%%-%%%-%%%%" patternChar="%"
                               type="tel"
                               placeholder="Phone Number"
                               className="has-text-centered flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                               name="password"
                               value={password}
                               style={{fontSize:"16px"}}
                               onChange={(e)=> setPassword(e.target.value)}
                               required
                />
                {/*<span className="icon is-small is-className" >*/}
                {/*    <i className=" fas fa-phone"></i>*/}
                {/*</span>*/}
                <br />
                <FormButton buttonLabel={'Login'}
                            buttonType={'submit'} />
            </form>



        </>
    );
}

