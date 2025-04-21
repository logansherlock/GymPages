"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MapComponent from "@/app/components/maps";
import RecentReviews from "@/app/components/recent_reviews";

export default function GymPage() {
  const [gym, setGym] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const { gym_id } = useParams();

  
  useEffect(() => {
    console.log("page.tsx gym_id type:", typeof gym_id); // Log the type of gym_id
    fetch(`/api/gyms/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);

        if (data.location) {
          console.log("LOCATION x: ", data.location.x);
          console.log("LOCATION y: ", data.location.y);
        }

        setTimeout(()=>{
          setGym(data);
          setLoading(false);
        }, 1000)

        console.log("Current gym object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [gym_id]);

  return (
    <div className="m-2">
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
            Loading Gym Data...
          </div>
        </div>
      ) : gym &&
        gym?.location?.x !== undefined &&
        gym?.location?.y !== undefined ? (
        <div className="m-1">
          <div className=" flex flex-wrap m-1 font-mono text-white">
            <div className="flex flex-wrap items-center uppercase max-w-s m-1 text-4xl shrink font-bold">
              {gym.gym_name}
            </div>
            <div className="flex flex-wrap flex-col text-left ml-5 m-1">
              <div className="uppercase font-bold text-sm m-1 mb-0">
                {gym.city}, {gym.state}
              </div>
              <div className="uppercase font-bold text-sm m-1 mt-0">
                {gym.street_address}
              </div>
            </div>
          </div>
          <div className="flex items-end m-1 font-mono justify-between text-white">
            <div className="w-[60%] h-[500px] max-w-screen-lg m-1">
              <MapComponent
                latitude={gym.location.x}
                longitude={gym.location.y}
              />
            </div>
            <div className="w-[40%] h-[500px] ml-0 m-1 max-w-screen-lg">
              <div className="flex flex-wrap flex-col justify-center items-center">
                <RecentReviews gym_id={gym_id} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
            Error, Not Loading.
          </div>
        </div>
      )}
    </div>
  );
}