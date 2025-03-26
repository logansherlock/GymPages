"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 justify-between">
      <Link
        href="/"
        className={`text-center ${
          pathname === "/" ? "font-bold text-stone-100" : "text-stone-800"
        }`}
      >
        home
      </Link>
      <Link
        href="/gyms"
        className={`text-center ${
          pathname === "/gyms" ? "font-bold text-stone-100" : "text-stone-800"
        }`}
      >
        gyms
      </Link>
      <Link
        href="/exercises"
        className={`text-center ${
          pathname === "/exercises"
            ? "font-bold text-stone-100"
            : "text-stone-800"
        }`}
      >
        exercises
      </Link>
      <Link
        href="/about"
        className={`text-center ${
          pathname === "/about"
            ? "font-bold text-stone-100"
            : "text-stone-800"
        }`}
      >
        about
      </Link>
      <Link
        href="/user"
        className={`text-center ${
          pathname === "/user"
            ? "font-bold text-stone-100"
            : "text-stone-800"
        }`}
      >
        users
      </Link>
      <Link
        href="/login"
        className={`text-center ${
          pathname === "/login"
            ? "font-bold text-stone-100"
            : "text-stone-800"
        }`}
      >
        login
      </Link>
      <Link
        href="/signup"
        className={`text-center ${
          pathname === "/signup"
            ? "font-bold text-stone-100"
            : "text-stone-800"
        }`}
      >
        sign-up
      </Link>
    </nav>
  );
};
