import React from "react";

export default function OurStoryLayout({
    children,
                                           }: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Include shared UI here e.g. a header or sidebar */}
            {children}

        </>
    )
}