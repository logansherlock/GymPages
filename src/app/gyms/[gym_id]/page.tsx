"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MapComponent from "@/app/components/maps";
import GymEquipment from "@/app/components/gym-equipment";
import RecentReviews from "@/app/components/recent-reviews";
import Link from "next/link";
import LoadingScreen from "@/app/components/loading-screen";

export default function GymPage() {
  const [gym, setGym] = useState<any | null>(null);
  const [equipment, setEquipment] = useState<any | null>(null);
  const [gymLoading, setGymLoading] = useState(true); // Track loading state
  const { gym_id } = useParams();
  console.log(gym_id);

  useEffect(() => {
    if (!gym_id) return;

    console.log("page.tsx gym_id type:", typeof gym_id); // Log the type of gym_id
    fetch(`/api/gym-page/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);

        if (data.location) {
          console.log("LOCATION x: ", data.location.x);
          console.log("LOCATION y: ", data.location.y);
        }
        setGym(data);

        console.log("Current gym object:", data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setGym(null);
      })
      .finally(() => setGymLoading(false));
  }, [gym_id]);

  return (
    <div className="">
      {gymLoading ? (
        <LoadingScreen text="Loading Gym Information..." />
      ) : gym &&
        gym?.location?.x !== undefined &&
        gym?.location?.y !== undefined ? (
        <div className="bg-stone-500 border-black border-[2px] p-3">
          <div className="flex flex-wrap m-[1px] font-mono text-white">
            <div
              className="flex flex-wrap items-center uppercase max-w-s m-[1px] text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              {gym.gym_name}
            </div>
            <div className="flex flex-wrap flex-col text-left ml-5 m-[1px]">
              <div className="uppercase font-bold text-sm m-[1px] mb-0">
                {gym.street_address}
              </div>
              <div className="uppercase font-bold text-sm m-[1px] mt-0">
                {gym.city}, {gym.state}
              </div>
            </div>
            <div className="flex ml-auto items-center m-[1px] ">
              <nav className="flex flex-wrap gap-6 justify-between m-[1px]">
                <Link
                  href={`/reviews/${gym.gym_id}`}
                  className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-stone-400 border-black border-[1px] px-2 font-bold rounded"
                >
                  More Reviews
                </Link>
                <Link
                  href={`/community-board/${gym.gym_id}`}
                  className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-stone-400 border-black border-[1px] px-2 font-bold rounded"
                >
                  Community Board
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex items-end m-[1px] font-mono justify-between text-white">
            <div className="w-[60%] h-[500px] max-w-screen-lg m-[1px]">
              <MapComponent
                latitude={gym.location.x}
                longitude={gym.location.y}
              />
            </div>
            <div className="w-[40%] h-[500px] ml-3 m-[1px] max-w-screen-lg bg-stone-400/75 border-black border-[2px]">
              <div className="flex flex-wrap flex-col justify-center items-center h-full">
                <RecentReviews gym_id={gym_id as string} />
              </div>
            </div>
          </div>
          <div className="pl-[2px] mt-3">
            <GymEquipment gym_id={gym_id as string} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div
            className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[2px] p-4"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Error, not loading.
          </div>
        </div>
      )}
    </div>
  );
}
