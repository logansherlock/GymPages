"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Navigation = () => {
  const pathname = usePathname();

  const { isLoggedIn, username, userID, membership } = useAuth();
  const baseLinkClass =
    "cursor-pointer hover:scale-[1.1] transition-transform text-center font-bold tracking-tighter";
  const [showAdminLinks, setShowAdminLinks] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload(); // this will re-run the useEffect in useAuth
  };

  return (
    <nav className="flex flex-wrap gap-5 items-center justify-between text-lg mr-2">
      <Link
        href="/gyms"
        className={`${baseLinkClass} text-center ${
          pathname === "/gyms" ? "font-bold text-stone-100" : "text-stone-800"
        }`}
      >
        Gyms
      </Link>
      <Link
        href="/exercises"
        className={`${baseLinkClass} text-center ${
          pathname === "/exercises"
            ? "font-bold text-stone-100"
            : "text-stone-800"
        }`}
      >
        Exercises
      </Link>
      <Link
        href="/about"
        className={`${baseLinkClass} text-center ${
          pathname === "/about" ? "font-bold text-stone-100" : "text-stone-800"
        }`}
      >
        About
      </Link>
      {username ? (
        <>
          {username === "admin" && (
            <div className="">
              <button
                onClick={() => setShowAdminLinks(!showAdminLinks)}
                className={`${baseLinkClass} text-center ${
                  showAdminLinks
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}              >
                Admin
              </button>
              {showAdminLinks && (
                <div className="absolute flex flex-col bg-stone-400 gap-y-3 max-w-lg text-sm p-2 border-black border-[1px]">
                <Link
                  href="/admin/admin-gyms"
                  className={`cursor-pointer hover:scale-[1.05] transition-transform text-center font-bold tracking-tighter bg-stone-500 px-1 `}
                >
                  Edit Gyms
                </Link>
                <Link
                  href="/admin/admin-users"
                  className={`cursor-pointer hover:scale-[1.05] transition-transform text-center font-bold tracking-tighter bg-stone-500 px-1 `}
                >
                  Edit Users
                </Link>
                <Link
                  href="/admin/admin-exercises"
                  className={`cursor-pointer hover:scale-[1.05] transition-transform text-center font-bold tracking-tighter bg-stone-500 px-1 `}
                >
                  Edit Exercises
                </Link>
              </div>
              )}
            </div>
          )}
          {userID !== 0 && membership && (
            <>
              <Link
                href={`/community-board/${membership}`}
                className={`${baseLinkClass} text-center ${
                  pathname.startsWith("/community-board")
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                Community Board
              </Link>
            </>
          )}
          {username !== "admin" && (
            <Link
              href={`/profile/${userID}`}
              className={`${baseLinkClass} text-center ${
                pathname.startsWith("/profile")
                  ? "font-bold text-stone-100"
                  : "text-stone-800"
              }`}
            >
              Profile
            </Link>
          )}
          <button
            onClick={handleLogout}
            className={`${baseLinkClass} text-center text-sm text-red-700 font-bold`}
          >
            SIGN OUT
          </button>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className={`${baseLinkClass} text-center ${
              pathname === "/auth/login"
                ? "font-bold text-stone-100"
                : "text-stone-800"
            }`}
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className={`${baseLinkClass} text-center ${
              pathname === "/auth/signup"
                ? "font-bold text-stone-100"
                : "text-stone-800"
            }`}
          >
            Signup
          </Link>
        </>
      )}
    </nav>
  );
};
