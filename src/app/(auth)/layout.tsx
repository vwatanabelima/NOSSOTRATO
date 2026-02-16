export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-blue-600">NOSSO TRATO</h1>
                    <p className="text-gray-500">Access your account</p>
                </div>
                {children}
            </div>
        </div>
    );
}
