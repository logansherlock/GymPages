"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export const Footer = () => {
  const baseLinkClass =
    "cursor-pointer hover:scale-[1.05] transition-transform transform origin-left text-center font-bold ";
  const [showAdminLinks, setShowAdminLinks] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="flex flex-row justify-between items-center py-2">
      <div className="flex flex-col items-start text-xs text-black pl-16">
        <Link href="/auth/signup" className={`${baseLinkClass} text-center`}>
          Create an Account
        </Link>
        <Link href="/auth/login" className={`${baseLinkClass} text-center`}>
          Login to Account
        </Link>
        <Link href="/gyms" className={`${baseLinkClass} text-center`}>
          Search Gym Database
        </Link>
        <Link href="/exercises" className={`${baseLinkClass} text-center`}>
          Search Exercise Database
        </Link>
        <a
          href="mailto:lsherlo1@oldwestbury.edu,mpadill7@oldwestbury.edu?subject=GymPages Support Request"
          className={`${baseLinkClass} text-center`}
        >
          Contact Support
        </a>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-stone-800 font-bold text-lg">
        © 2025 GymPages. All rights reserved.
      </div>
      <div className="flex flex-col">
        <Link href="/about">
          <Image
            src="/gympages-icons/GymPages_Icon.png"
            alt="Gym Image"
            height={10}
            width={120}
            className="mr-8 invert"
          />
        </Link>
      </div>
    </div>
  );
};
