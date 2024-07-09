export default function WeddingPartyLayout({
                                               children,
                                               rehearsaldinner,
                                               teaceremony// will be a page or nested layout
                                           }: {
    children: React.ReactNode;
    rehearsaldinner: React.ReactNode;
    teaceremony: React.ReactNode
}) {
    return (
        <>
            {/* Include shared UI here e.g. a header or sidebar */}
            Wedding Party Nav Bar
            {rehearsaldinner}
            {teaceremony}
            {children}
        </>
    )
}