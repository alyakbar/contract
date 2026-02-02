export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Admin pages have their own layout without the main Navbar/Footer
    return <>{children}</>;
}
