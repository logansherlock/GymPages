"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function AddExercise() {
  const [localMessage, setLocalMessage] = useState("");
  const { isLoggedIn, username, userID, membership } = useAuth();
  const [gymData, setGymData] = useState({
    gym_id: "",
    gym_name: "",
    latitude: "",
    longitude: "",
    street_address: "",
    city: "",
    zip: "",
    state: "",
    phone_number: "",
  });

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/admin/gyms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gymData),
      });

      const data = await response.json();

      setLocalMessage(data.message);
      setGymData({
        gym_id: "",
        gym_name: "",
        latitude: "",
        longitude: "",
        street_address: "",
        city: "",
        zip: "",
        state: "",
        phone_number: "",
      });

      if (response.ok) {
        router.push(`/gyms/${gymData.gym_id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setLocalMessage(error.message);
      } else {
        setLocalMessage("error occurred (page.tsx.tsx)");
      }
    }
  };

  // Handle changes in input fields
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setGymData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the state
    }));
  };

  return (
    <div>
      {isLoggedIn && userID === 0 ? (
        <div>
          <div className="flex flex-wrap m-[1px] font-mono text-white m-[1px] ">
            <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/admin/admin-gyms`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <span className="text-xl pt-1 ml-3">
                  {" "}
                  back to <span className="uppercase">ADMIN GYMS</span>
                </span>
              </Link>{" "}
            </div>
          </div>
          <div className="min-h-screen flex justify-center items-center -mt-20">
            <div className="w-full max-w-xl pt-6 pb-3 px-3 bg-zinc-500  border-[1px] border-black">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center font-mono m-[1px]"
              >
                <div
                  className="w-full max-w-lg text-center text-5xl font-bold"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  GYM CREATION
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="gym id"
                    name="gym_id"
                    value={gymData.gym_id}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="gym name"
                    name="gym_name"
                    value={gymData.gym_name}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="longitude"
                    name="longitude"
                    value={gymData.longitude}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                  <input
                    type="text"
                    placeholder="latitude"
                    name="latitude"
                    value={gymData.latitude}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="street address"
                    name="street_address"
                    value={gymData.street_address}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="city"
                    name="city"
                    value={gymData.city}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="zip code"
                    name="zip"
                    value={gymData.zip}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="state code"
                    name="state"
                    value={gymData.state}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="tel"
                    placeholder="(516) xxx-xxxx"
                    pattern="^\(\d{3}\) \d{3}-\d{4}$"
                    name="phone_number"
                    value={gymData.phone_number}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm text-center">
                  <button
                    type="submit"
                    className="m-[1px] px-3 py-1 w-[95px] border border-slate-900 bg-red-400 text-slate-100 font-bold rounded-md text-center"
                  >
                    Create
                  </button>
                </div>
                <div className="w-full max-w-sm">
                  {localMessage && (
                    <p
                      className="mt-4 px-4 py-2 w-full text-center text-white rounded-md font-bold 
                  bg-green-500"
                    >
                      {localMessage}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap m-[1px] font-mono text-white m-[1px] ">
            <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <span className="text-xl pt-1 ml-3">
                  {" "}
                  back to <span className="uppercase">HOME</span>
                </span>
              </Link>{" "}
            </div>
            <div
              className="flex flex-wrap items-center max-w-s m-[1px] ml-auto text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              ADD GYM
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and admin to add gyms.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be admin to add gyms.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
