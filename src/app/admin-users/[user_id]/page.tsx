"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import UserHistory from "@/app/components/user-history";

export default function userHistory() {
  const { isLoggedIn, username, userID, membership } = useAuth();

  const [user, setUser] = useState<any | any>(null);
  const [user_loading, setUserLoading] = useState(true);

  const { user_id } = useParams();

  useEffect(() => {
    if (!user_id) return;

    fetch(`/api/users/${user_id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched post:", data);
        setUser(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, [user_id]);

  return (
    <div className="m-2 font-mono">
      {user_loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div
            className="w-full max-w-s m-4 text-center text-5xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Loading User...
          </div>
        </div>
      ) : isLoggedIn && user && userID === 0 ? (
        <div className="m-1">
          <div className="flex flex-wrap m-1 font-mono text-white">
            <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink text-black font-bold">
              <Link
                href={`/admin-users`}
                className="text-white text-4xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←
              </Link>
              back to users
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-1 ml-auto uppercase text-4xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              {user.username} USER HISTORY
            </div>
          </div>
          <UserHistory user_id={user_id as string}></UserHistory>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap m-1 font-mono text-white m-1 ">
            <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold text-black">
              <Link
                href={`/`}
                className="text-white text-4xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←
              </Link>{" "}
              back to homepage
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-1 ml-auto text-4xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              USER HISTORY
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
              <div
                className="w-full max-w-s m-4 text-center text-4xl font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and admin to view user history.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
              <div
                className="w-full max-w-s m-4 text-center text-4xl font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be admin to view user history.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
