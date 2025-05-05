"use client";

import { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
} from "@react-google-maps/api";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "../components/loading-screen";

export default function Gym() {
  const { isLoggedIn, username, userID, membership } = useAuth();
  const [gyms, setGyms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [equipmentByGym, setEquipmentByGym] = useState<Map<string, string[]>>(new Map());
  const [selectedGym, setSelectedGym] = useState<any | null>(null);
  const [equipmentSearchTerm, setEquipmentSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API || "",
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch("/api/gym_equipment");
        const data = await res.json();
        const map = new Map<string, string[]>();
        data.forEach((entry: any) => {
          if (!map.has(entry.gym_id)) {
            map.set(entry.gym_id, []);
          }
          map.get(entry.gym_id)!.push(entry.equipment_name);
        });
        setEquipmentByGym(map);
      } catch (err) {
        console.error("Failed to fetch equipment:", err);
      }
    };
    fetchEquipment();
  }, []);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await fetch("/api/gyms");
        const data = await res.json();
        const gymsWithEquipment = data.map((gym: any) => ({
          ...gym,
          equipment: equipmentByGym.get(gym.gym_id) || [],
        }));
        setGyms(gymsWithEquipment);
      } catch (err) {
        console.error("Failed to fetch gyms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, [equipmentByGym]);

  useEffect(() => {
    console.log("Gyms loaded:", gyms);
  }, [gyms]);

  useEffect(() => {
    if (!selectedGym) return;

    fetch(`/api/rating/${selectedGym.gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.average_rating !== undefined) {
          setAverageRating(parseFloat(data.average_rating));
        } else {
          setAverageRating(null);
        }
      })
      .catch(() => setAverageRating(null));
  }, [selectedGym]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="">
      {loading ? (
        <LoadingScreen text="Loading Gyms" />
      ) : (
        <div className="bg-stone-500 border-black border-[1px] p-1">
          <div className="flex flex-row items-center font-bold m-2">
            <div
              className="flex items-center uppercase text-white max-w-s m-[1px] text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              GYM SEARCH
            </div>
            <input
              type="text"
              placeholder="Search gym names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[25%] ml-auto p-2 border border-black rounded text-black m-[1px]"
            />
            <input
              type="text"
              placeholder="Search gym equipment..."
              value={equipmentSearchTerm}
              onChange={(e) => setEquipmentSearchTerm(e.target.value)}
              className="w-[25%] ml-5 p-2 border border-black rounded text-black m-[1px]"
            />
          </div>
          <div className="h-[550px] border-[1px] border-black m-2">
            <GoogleMap
              zoom={12}
              center={{ lat: 40.743222191786764, lng: -73.53516023004484 }}
              mapContainerClassName="map-container"
              options={{
                mapTypeControl: false, 
                clickableIcons: false,
                // disableDefaultUI: false,
                streetViewControl: false,
                fullscreenControl: false
            }}
            >
              {gyms
                .filter((gym) => {
                  const nameMatch = gym.gym_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  const equipMatch =
                    equipmentSearchTerm === "" ||
                    (Array.isArray(gym.equipment) &&
                      gym.equipment.some((eq: string) =>
                        eq
                          .toLowerCase()
                          .includes(equipmentSearchTerm.toLowerCase())
                      ));
                  return nameMatch && equipMatch;
                })
                .map((gym) => (
                  <MarkerF
                    key={gym.gym_id}
                    position={{ lat: gym.location.x, lng: gym.location.y }}
                    onClick={() => setSelectedGym(gym)}
                  />
                ))}
              {selectedGym && (
                <InfoWindowF
                  position={{
                    lat: selectedGym.location.x,
                    lng: selectedGym.location.y,
                  }}
                  onCloseClick={() => setSelectedGym(null)}
                >
                  <div className="flex flex-col justify-center items-center text-black font-bold">
                    <div className="flex flex-col text-black font-bold text-2xl">
                      {selectedGym.gym_name}
                    </div>
                    {averageRating !== null && (
                      <div className="flex flex-row items-center text-yellow-600 font-semibold text-lg">
                        {averageRating.toFixed(1)}⭐️
                      </div>
                    )}
                    <div className="mb-1">{selectedGym.street_address}</div>
                    <div className="mb-1">
                      {selectedGym.city}, {selectedGym.state} {selectedGym.zip}
                    </div>
                    <div className="mb-1">{selectedGym.phone_number}</div>

                    <div className="flex flex-row justify-center">
                      <Link
                        href={`/gyms/${selectedGym.gym_id}`}
                        className="bg-green-500 font-bold text-white h-6 px-1 py-[3px] text-sm rounded hover:bg-green-600 border-black border-[1px]"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          </div>
          <div className="flex flex-col m-2 mt-4 text-white border-black border-[1px] bg-stone-400/75 py-2 px-4">
            <div
              className="text-4xl font-bold p-2"
              style={{
                WebkitTextStroke: "1px black",
              }}
            >
              SEARCH RESULTS
            </div>
            <div>
              <ul className="px-5 pb-2">
                {gyms
                  .filter((gym) => {
                    const nameMatch = gym.gym_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                    const equipMatch =
                      equipmentSearchTerm === "" ||
                      (Array.isArray(gym.equipment) &&
                        gym.equipment.some((eq: string) =>
                          eq.toLowerCase().includes(equipmentSearchTerm.toLowerCase())
                        ));
                    return nameMatch && equipMatch;
                  })
                  .map((gym) => (
                    <li key={gym.gym_id}>
                      <Link
                        href={`/gyms/${gym.gym_id}`}
                        className="flex flex-row items-end font-bold block my-1 cursor-pointer hover:scale-[1.25] transition-transform transform origin-left"
                      >
                        <span className="text-xl">{gym.gym_name}</span>
                        <span className="text-sm">
                          &nbsp;- {gym.city}, {gym.state}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
