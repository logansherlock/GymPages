"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommunityBoard from "@/app/components/community-board";
import Link from "next/link";

export default function GymCommunityBoard() {
  const [gym, setGym] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const { gym_id } = useParams();

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    if (!gym_id) return;

    console.log("page.tsx gym_id:", gym_id); // Log the type of gym_id
    fetch(`/api/gym-page/${gym_id}`)
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

  useEffect(() => {
    if (!userID) return;

    console.log("userID:", userID, typeof userID);
  }, [userID]);

  return (
    <div className="m-2 font-mono">
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div className="w-full max-w-s m-4 text-center text-5xl font-bold" style={{ WebkitTextStroke: "1px black" }}>
            Loading Community Board...
          </div>
        </div>
      ) : isLoggedIn && gym && (membership == gym.gym_id || userID === 0) ? (
        <div className="m-1">
          <div className="flex flex-wrap m-1 font-mono text-white">
          <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink text-black font-bold">
            <Link
              href={`/gyms/${gym_id}`}
              className="text-white text-4xl font-bold ml-2 mr-4"
              style={{ WebkitTextStroke: "1px black" }}
            >
              ←
            </Link>
            back to {gym.gym_name}
          </div>
            <div className="flex flex-wrap items-center max-w-s m-1 ml-auto uppercase text-4xl shrink font-bold" style={{ WebkitTextStroke: "1px black" }}>
            {gym.gym_name} COMMUNITY BOARD
            </div>
          </div>
          <CommunityBoard gym_id={gym_id as string} />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap m-1 font-mono text-white m-1 ">
            <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold text-black">
              <Link
                href={`/gyms/${gym.gym_id}`}
                className="text-white text-4xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←
              </Link>{" "}
              back to {gym.gym_name}
            </div>
            <div className="flex flex-wrap items-center max-w-s m-1 ml-auto text-4xl shrink font-bold" style={{ WebkitTextStroke: "1px black" }}>
              COMMUNITY BOARD
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
              <div className="w-full max-w-s m-4 text-center text-4xl font-bold" style={{ WebkitTextStroke: "1px black" }}>
                Must be logged in and a member of this gym to view posts.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
              <div className="w-full max-w-s m-4 text-center text-4xl font-bold" style={{ WebkitTextStroke: "1px black" }}>
                Must be a member of this gym to view posts.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
