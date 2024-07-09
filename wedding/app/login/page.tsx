// import { useRouter } from "next/navigation";
import LandingLogin from "@/app/ui/client/landinglogin";
import LoginServer from "@/app/ui/client/auth";
// import UserClient from "@/app/ui/client/user";


export default function LoginPage() {

    return (
        <>
            <LandingLogin>
                <LoginServer />
            </LandingLogin>
        </>
    );
}
