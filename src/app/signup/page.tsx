"use client";

import { useState } from "react";
import UserForm from "@/app/components/userForm"; // Import UserForm

export default function Page() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <UserForm setMessage={setMessage}/>
      {message && <p className="">{message}</p>}
    </div>
  );
} 