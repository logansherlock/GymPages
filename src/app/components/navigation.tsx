"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  const { isLoggedIn, username } = useAuth();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.reload(); // this will re-run the useEffect in useAuth
  };

  return (
    <nav className="flex flex-wrap gap-6 justify-between">
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
          pathname === "/about" ? "font-bold text-stone-100" : "text-stone-800"
        }`}
      >
        about
      </Link>
      {username ? (
        <>
          {username === "admin" && (
            <>
              <Link
                href="/admin-users"
                className={`text-center ${
                  pathname === "/admin-users"
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                edit-users
              </Link>
              <Link
                href="/admin-gyms"
                className={`text-center ${
                  pathname === "/admin-gyms"
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                edit-gyms
              </Link>
              <Link
                href="/admin-exercises"
                className={`text-center ${
                  pathname === "/admin-exercises"
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                edit-exercises
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="text-center text-[10px] text-red-500 font-bold"
          >
            sign out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className={`text-center ${
              pathname === "/auth/login"
                ? "font-bold text-stone-100"
                : "text-stone-800"
            }`}
          >
            login
          </Link>
        </>
      )}
    </nav>
  );
};
