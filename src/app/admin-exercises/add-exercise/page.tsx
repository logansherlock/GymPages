"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function AddExercise() {
  const [localMessage, setLocalMessage] = useState("");
  const { isLoggedIn, username, userID, membership } = useAuth();
  const [exerciseData, setExerciseData] = useState({
    exercise_id: "",
    exercise_name: "",
    motion: "",
    level: "",
    mechanic: "",
    muscle_group: "",
    body: "",
    video_link: "",
  });

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/admin/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exerciseData),
      });

      const data = await response.json();

      setLocalMessage(data.message);
      setExerciseData({
        exercise_id: "",
        exercise_name: "",
        motion: "",
        level: "",
        mechanic: "",
        muscle_group: "",
        body: "",
        video_link: "",
      });

      if (response.ok) {
        console.log("GOOD");
        router.push(`/exercises/${exerciseData.exercise_id}`);
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
    setExerciseData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the state
    }));
  };

  return (
    <div>
      {isLoggedIn && userID === 0 ? (
        <div>
          <div className="flex flex-wrap m-[1px] font-mono text-white m-[1px] ">
            <div className="flex flex-wrap items-center bg-stone-400/75 border-black border-[2px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
              <Link
                href={`/admin-exercises`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <span className="text-xl pt-1 ml-3">
                  {" "}
                  back to <span className="uppercase">ADMIN EXERCISES</span>
                </span>
              </Link>{" "}
            </div>
          </div>
          <div className="min-h-screen flex justify-center items-center -mt-20">
            <div className="w-full max-w-xl pt-6 pb-3 px-3 bg-stone-500  border-[2px] border-black">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center font-mono m-[1px]"
              >
                <div
                  className="w-full max-w-lg text-center text-5xl font-bold"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  EXERCISE CREATION
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="exercise id"
                    name="exercise_id"
                    value={exerciseData.exercise_id}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="exercise name"
                    name="exercise_name"
                    value={exerciseData.exercise_name}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="motion"
                    name="motion"
                    value={exerciseData.motion}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="difficulty"
                    name="level"
                    value={exerciseData.level}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="mechanic"
                    name="mechanic"
                    value={exerciseData.mechanic}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="muscle group"
                    name="muscle_group"
                    value={exerciseData.muscle_group}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <textarea
                    placeholder="description"
                    name="body"
                    value={exerciseData.body}
                    onChange={handleChange}
                    rows={1}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    required
                  />
                </div>
                <div className="w-full max-w-sm flex items-center">
                  <input
                    type="text"
                    placeholder="video link"
                    name="video_link"
                    value={exerciseData.video_link}
                    onChange={handleChange}
                    className="m-2 px-3 py-1 w-full border border-slate-900 bg-slate-100 text-slate-900 font-bold rounded-md text-center"
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
            <div className="flex flex-wrap items-center bg-stone-400/75 border-black border-[2px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
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
              ADD EXERCISE
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[2px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and admin to add exercises.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[2px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be admin to add exercises.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
