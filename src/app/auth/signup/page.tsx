"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [localMessage, setLocalMessage] = useState("");

  // initialize signup form data
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    pass_hash: "",
  });

  // function to handle signup when button is pressed
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // POST() method from auth-signup API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setLocalMessage(data.message);
      setFormData({
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        pass_hash: "",
      });

      // POST() method from auth-login API (login after signup)
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.pass_hash,
        }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        window.location.href = "/";
        setLocalMessage(loginData.message || "Login Success");
      } else {
        setLocalMessage(loginData.message || "Login failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        setLocalMessage(error.message);
      } else {
        setLocalMessage("error occurred (page.tsx.tsx)");
      }
    }
  };

  // handle changes in input fields on webpage
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center -mt-10">
      <div className="w-full max-w-lg pt-6 pb-3 px-3 bg-zinc-500  border-[1px] border-black">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center font-mono m-1"
        >
          <div className="w-full max-w-s text-center text-5xl text-white font-bold" style={{ WebkitTextStroke: "1px black" }}>
            ACCOUNT CREATION
          </div>
          <div className="w-full max-w-xs flex items-center">
            <input
              type="text"
              placeholder="john"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
            />
            <input
              type="text"
              placeholder="appleseed"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
            />
          </div>
          <div className="w-full max-w-xs flex items-center">
            <input
              type="email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
            />
          </div>
          <div className="w-full max-w-xs flex items-center">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
            />
          </div>
          <div className="w-full max-w-xs flex items-center">
            <input
              type="password"
              placeholder="password"
              name="pass_hash"
              value={formData.pass_hash}
              onChange={handleChange}
              className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
            />
          </div>
          <div className="w-full max-w-xs text-center">
            <button
              type="submit"
              className="m-1 px-3 py-1 w-[95px] border border-slate-900 bg-red-400 text-slate-100 font-bold rounded-md text-center"
            >
              Sign Up
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
      </div>
    </div>
  );
}
