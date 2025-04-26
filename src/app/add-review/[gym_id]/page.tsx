"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import AddReview from "@/app/components/add-review";

export default function Post() {
  const [gym, setGym] = useState<any | null>(null);
  const [gym_loading, setGymLoading] = useState(true);
  const { gym_id } = useParams();

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    fetch(`/api/gym-page/${gym_id}`)
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
    <div className="m-2">
      <div className="m-1">
        <div className="flex flex-wrap m-1 font-mono text-white m-1 ">
          <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold text-black">
            <Link
              href={`/reviews/${gym_id}`}
              className="text-white text-4xl font-bold ml-2 mr-4"
              style={{ WebkitTextStroke: "1px black" }}
            >
              ←
            </Link>{" "}
            back to reviews
          </div>
          <div className="flex flex-wrap items-center max-w-s m-1 ml-auto uppercase text-4xl shrink font-bold" style={{ WebkitTextStroke: "1px black" }}>
            LEAVE A REVIEW
          </div>
        </div>
        {gym_loading ? (
          <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
            <div className="w-full max-w-s m-4 text-center text-5xl font-bold" style={{ WebkitTextStroke: "1px black" }}>
              Loading Post...
            </div>
          </div>
        ) : isLoggedIn ? (
          <div className="m-1">
            {!gym_loading && gym ? (
              <div className="max-w-s mt-5 text-center text-3xl font-bold" style={{ WebkitTextStroke: "1px black" }}>
                Review for {gym.gym_name} in {gym.city}, {gym.state}
              </div>
            ) : (
              <></>
            )}
            <AddReview gym_id={gym_id as string}></AddReview>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
            <div className="w-full max-w-s m-4 text-center text-4xl font-bold" style={{ WebkitTextStroke: "1px black" }}>
              Must be a logged in to leave a review.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
