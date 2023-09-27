const AuthLayout = ({ children }:
    {
        children: React.ReactNode;
    }
    ) => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center h-full">
        <h1>Auth Layout</h1>
        {children}
        </div>
    );
    };

export default AuthLayout;