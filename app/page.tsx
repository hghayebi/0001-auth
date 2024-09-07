import { cn } from "@nextui-org/react";
import LoginButton from "@/components/auth/login-button";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="flex flex-col items-center gap-y-4 text-white">
        <h1 className={cn("text-6xl", font.className)}>🔐Auth</h1>
        <p className="text-md tracking-wide">A simple authentication service</p>
      </div>
      <LoginButton className="bg-white" size="lg">
        Sign In
      </LoginButton>
    </main>
  );
}
