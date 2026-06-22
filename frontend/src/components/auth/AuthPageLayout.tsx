import type { ReactNode } from "react";

type AuthPageLayoutProps = {
  children: ReactNode;
};

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <img
        src="/images/registration/registration.png"
        alt=""
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-white/35" aria-hidden />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-110">{children}</div>
      </div>
    </div>
  );
}
