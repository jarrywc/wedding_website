import type { Metadata } from "next";
import { Alegreya } from "next/font/google";
const inter = Alegreya({ subsets: ["latin"] });
import React from 'react';
import 'bulma/css/bulma.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./globals.css";
import UserProvider from "@/app/providers"
import {Viewport} from "next";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: 'CoupleWebsite.com',
  description: "D & J are getting married!!",
};


export default async function RootLayout({children}: { children: React.ReactNode; }) {

    return (
      <html lang="en" className="light">
      <head>
        <title>CoupleWebsite.com</title>
        <meta property="og:url" content="couplewebsite.com"/>
        <meta property="og:type" content="website"/>
        <meta
            property="og:title"
            content="D & J's Wedding Website"
        />
        <meta name="twitter:card" content="summary"/>
        <meta
            property="og:description"
            content="D & J are getting married!!"
        />
        <meta property="twitter:image" content="/djpreview.png"/>
        <meta property="twitter:image:width" content="1550"/>
        <meta property="twitter:image:height" content="918"/>
        {/*<meta name="apple-mobile-web-app-title" content="DJ"/>*/}

      </head>
      <body className={inter.className}>

      <>
        <UserProvider>
          {children}
        </UserProvider>
      </>
      </body>
      </html>
  );
}






