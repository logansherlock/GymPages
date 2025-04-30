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
    fetch(`/api/gym-page/${gym_id}`)
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
    <div className="m-2">
      {" "}
      {loading ? (
        <LoadingScreen text="Loading Reviews" />
      ) : gym ? (
        <div className="m-1">
          <div className="flex flex-wrap m-1 font-mono text-white">
            <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold text-black">
              <Link
                href={`/gyms/${gym_id}`}
                className="text-white text-4xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←
              </Link>{" "}
              back to {gym.gym_name}
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-1 ml-auto uppercase text-4xl shrink font-bold"
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
