"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-gray-900 h-screen flex flex-col items-center justify-center text-center">
      <Image src="/chatgpt-icon.svg" width={100} height={100} alt="logo" />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse mt-3"
      >
        Sign In to use ChatAI
      </button>
    </div>
  );
}

export default Login;
