'use client'
// @ts-expect-error
import { useFormStatus } from 'react-dom'
// import { useRef, useTransition} from "react";

export default function FormButton(
    {buttonType, buttonLabel, buttonDisabled}:
    {buttonType?: 'submit'; buttonLabel: string, buttonDisabled?: false}){
    const { pending } = useFormStatus();
    return(
        <div className={`p-1 pt-1`}>
            <button
                aria-disabled={pending}
                disabled={pending}
                type={buttonType}
                className="button is-light">{buttonLabel}</button>
        </div>
    )
}

export function FetchButton(
    {buttonType, buttonLabel, buttonDisabled}:
        {buttonType?: 'button', buttonLabel: string, buttonDisabled?: boolean}){
    //const { pending } = useFormStatus();
    return(
        <>
            <button
                type={buttonType}
                className="btn btn-primary">{buttonLabel}</button>
        </>
    )
}

// export default function ServerButton({buttonType, buttonLabel}:{buttonType?: 'submit'; buttonLabel: string}){
//     const { pending } = useFormStatus();
//     return(
//         <>
//             <button
//                 disabled={pending}
//                 type={buttonType}
//                 className="btn btn-primary disabled:grey">{buttonLabel}</button>
//         </>
//     )
// }