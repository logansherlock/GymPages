"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  const { isLoggedIn, username, userID, membership } = useAuth();
  const baseLinkClass =
    "cursor-pointer hover:scale-[1.1] transition-transform text-center font-bold";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload(); // this will re-run the useEffect in useAuth
  };

  return (
    <nav className="flex flex-wrap gap-4 justify-between">
      <Link
        href="/gyms"
        className={`${baseLinkClass} text-center ${
          pathname === "/gyms" ? "font-bold text-stone-100" : "text-stone-800"
        }`}
      >
        gyms
      </Link>
      <Link
        href="/exercises"
        className={`${baseLinkClass} text-center ${
          pathname === "/exercises"
            ? "font-bold text-stone-100"
            : "text-stone-800"
        }`}
      >
        exercises
      </Link>
      <Link
        href="/about"
        className={`${baseLinkClass} text-center ${
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
                className={`${baseLinkClass} text-center ${
                  pathname === "/admin-users"
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                edit-users
              </Link>
              <Link
                href="/admin-gyms"
                className={`${baseLinkClass} text-center ${
                  pathname === "/admin-gyms"
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                edit-gyms
              </Link>
              <Link
                href="/admin-exercises"
                className={`${baseLinkClass} text-center ${
                  pathname === "/admin-exercises"
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                edit-exercises
              </Link>
            </>
          )}
          {username !== "admin" && (
            <>
              <Link
                href={`/community-board/${membership}`}
                className={`${baseLinkClass} text-center ${
                  pathname.startsWith("/community-board")
                    ? "font-bold text-stone-100"
                    : "text-stone-800"
                }`}
              >
                community board
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className={`${baseLinkClass} text-center text-[10px] text-red-500 font-bold`}
          >
            sign out
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
            log-in
          </Link>
          <Link
            href="/auth/signup"
            className={`${baseLinkClass} text-center ${
              pathname === "/auth/signup"
                ? "font-bold text-stone-100"
                : "text-stone-800"
            }`}
          >
            sign-up
          </Link>
        </>
      )}
    </nav>
  );
};
