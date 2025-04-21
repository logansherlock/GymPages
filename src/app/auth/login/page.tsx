"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [localMessage, setLocalMessage] = useState("");

  // Handle form submission
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login response status:", response.status);

      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        localStorage.setItem("username", data.user.username); 
        router.push("/"); // redirect
      } else {
        setErrorMessage(data.message || "Login failed");
        setLocalMessage(data.message);
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setLocalMessage("Something went wrong. Please try again.");
    }
  }

  // Redirect to signup page
  async function handleSignUp() {
    router.push("/auth/signup");
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
      <div className="w-full max-w-xs">
        {localMessage && (
          <p
            className="mt-4 px-4 py-2 w-full text-center text-white rounded-md font-bold 
                      bg-green-500"
          >
            {localMessage}
          </p>
        )}
        </div>
    </form>
  );
}