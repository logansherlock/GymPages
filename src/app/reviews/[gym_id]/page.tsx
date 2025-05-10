"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Reviews from "@/app/components/reviews";
import LoadingScreen from "@/app/components/loading-screen";

export default function ReviewsPage() {
  const [gym, setGym] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const { gym_id } = useParams();

  useEffect(() => {
    if (!gym_id) return;

    console.log("page.tsx gym_id:", gym_id); // Log the type of gym_id
    fetch(`/api/gyms/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);
        setGym(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setGym(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [gym_id]);

  return (
    <div className="bg-stone-500 border-black border-[1px] p-3">
      {" "}
      {loading ? (
        <LoadingScreen text="Loading Reviews" />
      ) : gym ? (
        <div className="m-[1px]">
          <div className="flex flex-wrap m-[1px] font-mono text-white">
            <div className="flex flex-wrap items-center bg-stone-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/gyms/${gym_id}`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ← <span className="text-xl pt-1 ml-3"> back to <span className="uppercase">{gym.gym_name}</span></span>
              </Link>{" "}
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-[1px] ml-auto uppercase text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              {gym.gym_name} REVIEWS
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
