// NOTE: this layout is for the /auth route every route inside the /auth route will have this layout applied to it.

// NOTE: eg: /auth/login ,/auth/sighup.
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-screen flex items-center justify-center
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    >
      {children}
    </div>
  );
};

export default AuthLayout;
