"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  async function handleSignUp() {
    router.push("/signup");
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20"
    >
      <div className="w-full max-w-s m-4 text-center text-5xl font-bold">account login</div>
      <div className="w-full max-w-xs flex items-center">
        <input
          type="email"
          placeholder="email"
          name="user-email"
          className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
        />
      </div>
      <div className="w-full max-w-xs flex items-center">
        <input
          type="password"
          placeholder="password"
          name="user-password"
          className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
        />
      </div>
      <div className="w-full max-w-xs text-center">
        <button
          type="submit"
          className="m-1 px-3 py-1 w-[75px] border border-slate-900 bg-blue-400 text-slate-100 font-bold rounded-md text-center"
        >
          login
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="m-1 px-3 py-1 w-[95px] border border-slate-900 bg-red-400 text-slate-100 font-bold rounded-md text-center"
        >
          sign-up
        </button>
      </div>
    </form>
  );
}
