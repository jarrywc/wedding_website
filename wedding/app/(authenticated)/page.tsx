// import { useRouter } from "next/navigation";
import Landing from "@/app/ui/client/landing";
// import {SessionInfo} from "@/app/ui/server/session";
import React from "react";
import {LogoutForm} from "@/app/ui/client/auth";
import UserClient from "@/app/ui/client/user";


export default function Home() {
  // @ts-ignore
  return (
    <>
      <Landing />
      {/*<UserClient/>*/}
      {/*<LogoutForm />*/}

    </>
  );
}
