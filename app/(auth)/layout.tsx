function AuthLayout({
    children // Corrected to lowercase 'c'
}: {
    children: React.ReactNode; // Corrected to lowercase 'c'
}) {
    return (
        <div>
            {children}
        </div>
    );
}

export default AuthLayout;
