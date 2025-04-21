"use client";

import { useState } from "react";
import SignUp from "@/app/components/signup"; // Import UserForm

export default function Page() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <SignUp setMessage={setMessage}/>
      {message && <p className="">{message}</p>}
    </div>
  );
} 