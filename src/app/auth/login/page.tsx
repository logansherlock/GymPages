"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localMessage, setLocalMessage] = useState("");

  // function to handle login when button is pressed
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // POST() method from auth-login API (login cookie creation)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        localStorage.setItem("username", data.user.username);
        window.location.href = "/";
        setLocalMessage(data.message);
      } else {
        setLocalMessage(data.message);
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      setLocalMessage("Something went wrong. Please try again.");
    }
  }

  // redirect to signup page
  async function handleSignUp() {
    router.push("/auth/signup");
  }

  return (
    <div className="min-h-screen flex justify-center items-center m-2 -mt-10">
      <div className="w-full max-w-md p-6 pb-0 bg-zinc-500 border-[1px] border-black">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center font-mono"
        >
          <div className="w-full max-w-sm text-center text-5xl text-white font-bold" style={{ WebkitTextStroke: "1px black" }}>
            ACCOUNT LOGIN
          </div>

          <div className="w-full max-w-xs flex items-center">
            <input
              type="email"
              placeholder="email"
              name="user-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
            />
          </div>
          <div className="w-full max-w-xs flex items-center">
            <input
              type="password"
              placeholder="password"
              name="user-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
            />
          </div>
          <div className="w-full max-w-xs text-center">
            <button
              type="submit"
              className="m-1 px-3 py-1 w-[95px] border border-slate-900 bg-blue-400 text-slate-100 font-bold rounded-md text-center"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="m-1 px-3 py-1 w-[95px] border border-slate-900 bg-red-400 text-slate-100 font-bold rounded-md text-center"
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-wrap max-w-xs m-5 mt-0">
            {localMessage && (
              <p
                className={`mt-4 px-2 w-full text-center text-white rounded-md border-black border-[1px] font-bold 
                        ${
                          localMessage.includes("successful")
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
              >
                {localMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
