"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import UserHistory from "@/app/components/user-history";
import LoadingScreen from "@/app/components/loading-screen";

export default function userHistory() {
  const { isLoggedIn, username, userID, membership } = useAuth();

  const [user, setUser] = useState<any | any>(null);
  const [user_loading, setUserLoading] = useState(true);

  const { user_id } = useParams();

  useEffect(() => {
    if (!user_id) return;

    fetch(`/api/admin/users/${user_id}`, { method: "GET" })
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
    <div className="bg-zinc-500 border-black border-[1px] p-3">
      {user_loading ? (
        <LoadingScreen text="Loading User" />
      ) : isLoggedIn && user && userID === 0 ? (
        <div className="m-1">
          <div className="flex flex-wrap m-1 font-mono text-white">
            <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/admin/admin-users`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <span className="text-xl pt-1 ml-3">
                  {" "}
                  back to <span className="uppercase">USERS</span>
                </span>
              </Link>{" "}
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-1 ml-auto uppercase text-5xl shrink font-bold"
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
            <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <span className="text-xl pt-1 ml-3">
                  {" "}
                  back to <span className="uppercase">HOME</span>
                </span>
              </Link>{" "}
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-1 ml-auto text-4xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              USER HISTORY
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-1">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and admin to view user history.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-1">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
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
