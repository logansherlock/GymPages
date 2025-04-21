"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Reviews from "@/app/components/reviews";

export default function GymCommunityBoard() {
  const [gym, setGym] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const { gym_id } = useParams();

  useEffect(() => {
    console.log("page.tsx gym_id:", gym_id); // Log the type of gym_id
    fetch(`/api/gyms/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);

        setTimeout(() => {
          setGym(data);
          setLoading(false);
        }, 1000);

        console.log("Current gym object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [gym_id]);

  return (
    <div className="m-2">
      {" "}
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
            Loading Reviews...
          </div>
        </div>
      ) : gym ? (
        <div>
          <div className="flex flex-wrap m-1 font-mono text-white">
            <div className="flex flex-wrap items-center uppercase max-w-s m-1 text-4xl shrink font-bold">
              <Link href={`/gyms/${gym.gym_id}`}>{gym.gym_name}</Link>
            </div>
            <div className="flex flex-wrap flex-col text-left ml-5 m-1">
              <div className="uppercase font-bold text-sm m-1 mb-0">
                {gym.street_address}
              </div>
              <div className="uppercase font-bold text-sm m-1 mt-0">
                {gym.city}, {gym.state}
              </div>
            </div>
            <div className="flex flex-wrap items-center max-w-s m-1 ml-auto text-4xl shrink font-bold">
              REVIEWS
            </div>
          </div>

          <Reviews gym_id={gym_id as string} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
