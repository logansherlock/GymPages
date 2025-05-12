"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MapComponent from "@/app/components/maps";
import GymEquipment from "@/app/components/gym-equipment";
import RecentReviews from "@/app/components/recent-reviews";
import Link from "next/link";
import LoadingScreen from "@/app/components/loading-screen";
import { useAuth } from "@/hooks/useAuth";
import { FaPhone } from "react-icons/fa";
import { FaDirections } from "react-icons/fa";

export default function GymPage() {
  const [gym, setGym] = useState<any | null>(null);
  const [equipment, setEquipment] = useState<any | null>(null);
  const { isLoggedIn, username, userID, membership } = useAuth();
  const [gymLoading, setGymLoading] = useState(true); // Track loading state
  const [confirmJoin, setConfirmJoin] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const { gym_id } = useParams();

  console.log(gym_id);

  useEffect(() => {
    if (!gym_id) return;

    console.log("page.tsx gym_id type:", typeof gym_id); // Log the type of gym_id
    fetch(`/api/gyms/${gym_id}`)
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

  const handleJoinGym = async () => {
    try {
      const res = await fetch(`/api/profile/${userID}/join-gym`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          gym_id: gym_id,
        }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Failed to join gym");
      }
    } catch (error) {
      console.error("Error joining gym:", error);
    }
  };

  useEffect(() => {
    if (!gym_id) return;

    fetch(`/api/reviews/rating/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.average_rating !== undefined) {
          setAverageRating(parseFloat(data.average_rating));
        } else {
          setAverageRating(null);
        }
      })
      .catch(() => setAverageRating(null));
  }, [gym_id]);

  return (
    <div className="">
      {gymLoading ? (
        <LoadingScreen text="Loading Gym Information..." />
      ) : gym &&
        gym?.location?.x !== undefined &&
        gym?.location?.y !== undefined ? (
        <div className="bg-zinc-500 border-black border-[1px] p-3">
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
            <div className="ml-5 flex items-center">
              {averageRating !== null && (
                <div className="text-white font-bold text-2xl bg-zinc-400/75 text-black px-2 py-1 rounded">
                  ⭐️ {averageRating.toFixed(1)}
                </div>
              )}
            </div>
            <div className="flex ml-auto items-center m-[1px] ">
              <nav className="flex flex-wrap gap-6 justify-between m-[1px]">
                <Link
                  href={`/reviews/${gym.gym_id}`}
                  className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-zinc-400 border-black border-[1px] px-2 font-bold rounded"
                >
                  More Reviews
                </Link>
                <Link
                  href={`/community-board/${gym.gym_id}`}
                  className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-zinc-400 border-black border-[1px] px-2 font-bold rounded"
                >
                  Community Board
                </Link>
                {membership === gym_id ? (
                  <>
                    <div className="text-center bg-green-400 border-black border-[1px] px-2 font-bold rounded">
                      ACTIVE MEMBER
                    </div>
                  </>
                ) : (
                  <>
                    {isLoggedIn && userID !== 0 ? (
                      <>
                        {confirmJoin ? (
                          <nav className="flex flex-row items-center">
                            <div className="text-sm font-bold mr-4">
                              Confirm join?
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={handleJoinGym}
                                className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-green-400 border-black border-[1px] px-2 font-bold rounded"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmJoin(false)}
                                className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-red-400 border-black border-[1px] px-2 font-bold rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </nav>
                        ) : (
                          <button
                            className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-blue-400 border-black border-[1px] px-2 font-bold rounded"
                            onClick={() => setConfirmJoin(true)}
                          >
                            Join Gym
                          </button>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </nav>
            </div>
          </div>
          <div className="flex flex-row gap-x-3">
            <div className="flex flex-col w-[60%] m-[1px] font-mono text-white gap-x-3">
              <div className=" h-[500px] m-[1px]">
                <MapComponent
                  latitude={gym.location.x}
                  longitude={gym.location.y}
                />
              </div>
              <div className="flex flex-row items-center mt-3 gap-x-3">
                <div className="w-[60%] max-h-[200px]">
                  <GymEquipment gym_id={gym_id as string} />
                </div>
                <div className="w-[40%] h-[200px] m-[1px] bg-zinc-400/75 border-black border-[1px] p-3 overflow-y-auto">
                  <div className="flex flex-col h-full justify-start">
                    <div
                      className="text-center w-full text-white text-3xl font-bold"
                      style={{ WebkitTextStroke: "1px black" }}
                    >
                      Contact
                    </div>
                    <div className="flex flex-col flex-grow items-center mt-1 gap-y-1 font-bold tracking-widest">
                      <div className="text-xl">{gym.gym_name}</div>
                      <div className="text-sm">{gym.street_address}</div>
                      <div className="text-sm">
                        {gym.city}, {gym.state} {gym.zip}
                      </div>
                      <div className="flex items-center gap-x-2">
                        <FaPhone />
                        <span>{gym.phone_number}</span>
                      </div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${gym.location.x},${gym.location.y}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer bg-orange-500 text-white px-1 rounded hover:bg-orange-600 font-bold inline-block text-center flex items-center gap-x-2"
                      >
                        <FaDirections />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-[1px] w-[40%] bg-zinc-400/75 border-black border-[1px] p-3">
              {/* <div className="flex flex-wrap flex-col justify-center items-center h-full"> */}
              <RecentReviews gym_id={gym_id as string} />
              {/* </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20">
          <div
            className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Error, not loading.
          </div>
        </div>
      )}
    </div>
  );
}
