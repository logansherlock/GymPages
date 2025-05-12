"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import AddPost from "@/app/components/add-post";
import LoadingScreen from "@/app/components/loading-screen";

export default function Post() {
  const [gym, setGym] = useState<any | null>(null);
  const [gym_loading, setGymLoading] = useState(true);
  const { gym_id } = useParams();

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    if (!gym_id) return;

    fetch(`/api/gyms/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);
        setGym(data);
        setGymLoading(false);
        console.log("Current gym object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [gym_id]);

  return (
    <div className="bg-stone-500 border-black border-[1px] p-3">
      <div className="m-[1px]">
        <div className="flex flex-wrap m-[1px] font-mono text-white m-[1px] ">
            <div className="flex flex-wrap items-center bg-stone-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/community-board/${gym_id}`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ← <span className="text-xl pt-1 ml-3"> back to <span className="uppercase">COMMUNITY BOARD</span></span>
              </Link>{" "}
            </div>
          <div
            className="flex flex-wrap items-center max-w-s m-[1px] ml-auto uppercase text-5xl shrink font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            CREATE A COMMUNITY POST
          </div>
        </div>
        {gym_loading ? (
          <LoadingScreen text="Loading Post" />
        ) : isLoggedIn ? (
          <div className="mt-5 max-w-5xl mx-auto p-1">
            {!gym_loading && gym ? (
              <div
                className="max-w-s mt-5 text-center text-4xl font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                {gym.gym_name} in {gym.city}, {gym.state}
              </div>
            ) : (
              <></>
            )}
            <AddPost gym_id={gym_id as string}></AddPost>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
            <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
              Must be a logged in to leave a review.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
