import {Viewport} from "next";
import React from "react";
import Navigation from "@/app/ui/client/navigation";

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
}

export default function WeddingLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Include shared UI here e.g. a header or sidebar */}

            <Navigation />
            {children}
        </>
    )
}