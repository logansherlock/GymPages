"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function GymList() {
  const [gyms, setGyms] = useState<any[]>([]); // Ensure it's an array
  const [gyms_loading, setGymsLoading] = useState(true);
  const { isLoggedIn, username, userID, membership } = useAuth();

  const handleDeleteGym = async (gym_id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gym?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/gyms/${gym_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGyms((prevGyms) => prevGyms.filter((gym) => gym.gym_id !== gym_id));
      } else {
        console.error("Failed to delete gym");
      }
    } catch (error) {
      console.error("Error deleting gym:", error);
    }
  };

  useEffect(() => {
    fetch("/api/admin/gyms")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gyms:", data); // Debugging log
        if (Array.isArray(data)) {
          setGyms(data);
        } else {
          console.error("Expected an array but got:", data);
          setGyms([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => {
        setGymsLoading(false);
      });
  }, []);

  return (
    <div className="">
      {isLoggedIn && userID === 0 ? (
        <div className=" bg-stone-500 border-black border-[1px] p-3">
          <div className="flex flex-wrap m-2 justify-center font-mono text-white m-[1px] ">
            <div
              className="flex flex-wrap items-center max-w-s m-[1px] text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              GYMS
            </div>
            <nav className="flex ml-auto items-center m-[1px] flex-wrap gap-6 justify-between m-[1px]">
              <Link
                href={`/admin/admin-gyms/add-gym`}
                className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-stone-400 border-black border-[1px] px-2 font-bold rounded"
              >
                Add Gym
              </Link>
            </nav>
          </div>
          <div className="flex flex-wrap justify-center m-1">
            {gyms.length > 0 ? (
              <table className="w-full table-auto">
                <thead className="bg-stone-600 text-stone-100 ">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">gym_id</th>
                    <th className="px-4 py-2 border border-gray-300">
                      gym_name
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      street_address
                    </th>
                    <th className="px-4 py-2 border border-gray-300">city</th>
                    <th className="px-4 py-2 border border-gray-300">zip</th>
                    <th className="px-4 py-2 border border-gray-300">state</th>
                    <th className="px-4 py-2 border border-gray-300">
                      functions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gyms.map((gym, index) => (
                    <tr
                      key={gym.gym_id}
                      className={
                        index % 2 === 0 ? "bg-stone-400" : "bg-neutral-500"
                      }
                    >
                      <td className="px-4 py-1.5 border border-gray-300 font-bold">
                        {gym.gym_id}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {gym.gym_name}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {gym.street_address}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {gym.city}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {gym.zip}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {gym.state}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300 text-center font-bold">
                        <Link
                          href={`/gyms/${gym.gym_id}`}
                          className="bg-yellow-500 text-white h-6 px-1 py-[3px] text-sm rounded hover:bg-yellow-600 mr-3 border-black border-[1px]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteGym(gym.gym_id)}
                          className="bg-red-600 text-white h-6 px-1 text-sm rounded hover:bg-red-700 border-black border-[1px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No gyms found.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap m-[1px] font-mono text-white m-[1px] ">
            <div className="flex flex-wrap items-center bg-stone-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
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
              className="flex flex-wrap items-center max-w-s m-[1px] ml-auto text-4xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              EXERCISES
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and admin to view exercises.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be admin to view exercises.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
