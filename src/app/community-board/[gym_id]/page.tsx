"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommunityBoard from "@/app/components/community-board";
import Link from "next/link";
import LoadingScreen from "@/app/components/loading-screen";

export default function GymCommunityBoard() {
  const [gym, setGym] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const { gym_id } = useParams();

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    // if gym_id doesn't exist, exit
    if (!gym_id) return;

    // GET() method from gym API
    fetch(`/api/gyms/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);
        setGym(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setGym([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [gym_id]);

  return (
    <div className="bg-zinc-500 border-black border-[1px] p-3">
      {loading ? (
        <LoadingScreen text="Loading Community Board" />
      ) : isLoggedIn && gym && (membership == gym.gym_id || userID === 0) ? (
        <div className="m-[1px]">
          <div className="flex flex-wrap m-[1px] font-mono text-white">
            <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/gyms/${gym_id}`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <span className="text-xl pt-1 ml-3">
                  {" "}
                  back to <span className="uppercase">{gym.gym_name}</span>
                </span>
              </Link>{" "}
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-[1px] ml-auto uppercase text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              {gym.gym_name} COMMUNITY BOARD
            </div>
          </div>
          <CommunityBoard gym_id={gym_id as string} />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap m-[1px] font-mono text-white m-[1px] ">
            <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/gyms/${gym_id}`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <span className="text-xl pt-1 ml-3">
                  {" "}
                  back to <span className="uppercase">{gym.gym_name}</span>
                </span>
              </Link>{" "}
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-[1px] ml-auto text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              COMMUNITY BOARD
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
              <div
                className="max-w-s m-4 text-center text-4xl text-white font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and a member of this gym to view posts.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
              <div
                className="max-w-s m-4 text-center text-4xl text-white font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be a member of this gym to view posts.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
