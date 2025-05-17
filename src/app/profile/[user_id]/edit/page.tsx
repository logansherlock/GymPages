"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function EditProfile() {
  const { isLoggedIn, userID } = useAuth();
  const { user_id } = useParams();
  const router = useRouter();

  // default profile data
  const [profileData, setProfileData] = useState({
    visibility: "public",
    max_bench: null,
    max_squat: null,
    max_dead: null,
  });
  const [localMessage, setLocalMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GET() method from profile API by user_id
    fetch(`/api/profile/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData({
          visibility: data.visibility,
          max_bench: data.max_bench,
          max_squat: data.max_squat,
          max_dead: data.max_dead,
        });
      })
      .finally(() => setLoading(false));
  }, [user_id]);

  // show changes while typing on webpage
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number"
          ? value === ""
            ? null
            : Number(value)
          : value,
    }));
  };


  // function to handle submission of the edited profile data
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {

      // POST() method of the profile API by user_id
      const response = await fetch(`/api/profile/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      setLocalMessage(data.message || "Profile updated");

      // if update is okay, return to user profile
      if (response.ok) {
        router.push(`/profile/${user_id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setLocalMessage(error.message);
      } else {
        setLocalMessage("error occurred");
      }
    }
  };

  if (!isLoggedIn || userID !== Number(user_id)) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
        <div
          className="max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
          style={{ WebkitTextStroke: "1px black" }}
        >
          You are not authorized to edit this profile.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap m-[1px] font-mono text-white">
        <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
          <Link
            href={`/profile/${user_id}`}
            className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
            style={{ WebkitTextStroke: "1px black" }}
          >
            ←{" "}
            <span className="text-xl pt-1 ml-3">
              back to <span className="uppercase">PROFILE</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="min-h-screen flex justify-center items-center -mt-20">
        <div className="w-full max-w-xl pt-6 pb-3 px-3 bg-zinc-500 border-[1px] border-black">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center font-mono m-[1px]"
          >
            <div
              className="w-full max-w-lg text-center text-5xl font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              EDIT PROFILE
            </div>
            <div className="font-bold text-white text-xl mt-2">
              PERSONAL RECORDS
            </div>
            <div className="w-full max-w-sm flex flex-row items-center font-bold text-lg">
              <div>BENCH</div>
              <input
                type="number"
                name="max_bench"
                placeholder="Max Bench"
                value={profileData.max_bench ?? ""}
                onChange={handleChange}
                className="m-2 px-3 py-1 ml-auto w-[65%] border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
              />
            </div>
            <div className="w-full max-w-sm flex flex-row items-center font-bold text-lg">
              <div>SQUAT</div>
              <input
                type="number"
                name="max_squat"
                placeholder="Max Squat"
                value={profileData.max_squat ?? ""}
                onChange={handleChange}
                className="m-2 px-3 py-1 ml-auto w-[65%] border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
              />
            </div>
            <div className="w-full max-w-sm flex flex-row items-center font-bold text-lg">
              <div>DEADLIFT</div>
              <input
                type="number"
                name="max_dead"
                placeholder="Max Deadlift"
                value={profileData.max_dead ?? ""}
                onChange={handleChange}
                className="m-2 px-3 py-1 ml-auto w-[65%] border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center">
              <div className="w-full max-w-sm text-center">
                <button
                  type="submit"
                  className="m-[1px] px-3 py-1 w-[95px] border border-slate-900 bg-orange-500 text-slate-100 font-bold rounded-md text-center"
                >
                  Update
                </button>
              </div>
              <div className="w-full max-w-sm flex items-center justify-center px-2 gap-x-10 my-2">
                <button
                  type="button"
                  onClick={() =>
                    setProfileData((prev) => ({
                      ...prev,
                      visibility:
                        prev.visibility === "public" ? "private" : "public",
                    }))
                  }
                  className={`px-4 py-1 rounded-md font-bold border transition-colors ${
                    profileData.visibility === "public"
                      ? "bg-green-500 text-white border-black border-[1px"
                      : "bg-red-500 text-white border-black border-[1px]"
                  }`}
                >
                  {profileData.visibility === "public" ? "Public" : "Private"}
                </button>
              </div>
            </div>
            <div className="w-full max-w-sm">
              {localMessage && (
                <p className="mt-4 px-4 py-2 w-full text-center text-white rounded-md font-bold bg-green-500">
                  {localMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
