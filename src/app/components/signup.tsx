"use client";

import { useState } from "react";

export default function SignUp({setMessage}: {setMessage: (msg: string) => void;}) {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    pass_hash: "",
  });

  const [localMessage, setLocalMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("submitting form (signup.tsx):", formData);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("response received (signup.tsx):", data);

      if (!response.ok) {
        throw new Error(data.message || "something went wrong (signup.tsx)");
      }

      setLocalMessage(data.message);
      setMessage(data.message);

      setFormData({
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        pass_hash: "",
      });
      
    } catch (error) {
      if (error instanceof Error) {
        setLocalMessage(error.message);
        setMessage(error.message);
      } else {
        setLocalMessage("error occurred (signup.tsx)");
        setMessage("error occurred (signup.tsx)");
      }
    }
  };

  // Handle changes in input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the state
    }));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20"
      >
        <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
          account creation
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
    </div>
  );
}
