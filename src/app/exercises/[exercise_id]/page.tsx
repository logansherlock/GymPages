"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import LoadingScreen from "@/app/components/loading-screen";

export default function ExercisePage() {
  const [exercise, setExercise] = useState<any | null>(null);
  const [equipment, setEquipment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [equip_loading, setEquipLoading] = useState(true);
  const { exercise_id } = useParams();

  useEffect(() => {
    // if exercise_id doesn't exist, exit
    if (!exercise_id) return;

    const fetchExercise = async () => {
      try {
        // GET() method from exercise API by exercise_id
        const res = await fetch(`/api/exercises/exercise-by-id/${exercise_id}`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setExercise(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exercise_id]);

  useEffect(() => {
    // if exercise doesn't have any related equipment
    if (!exercise?.related_equip_id) return;

    // GET() method from equipment API by equipment_id
    fetch(`/api/equipment/${exercise.related_equip_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);
        setEquipment(data);
        setEquipLoading(false);
        console.log("Current equipment object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [exercise]);

  return (
    <div className="">
      {loading ? (
        <LoadingScreen text="Loading Exercise" />
      ) : exercise ? (
        <div className="">
          <div className="bg-zinc-500 border-black border-[1px] p-1">
            <div className="flex m-1 font-mono text-white">
              <div
                className="flex items-center uppercase max-w-s m-1 text-5xl shrink font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                {exercise.exercise_name}:
              </div>
              <div className="flex flex-col text-left mx-5 m-1 text-white">
                <div className="uppercase font-bold text-sm m-1 mb-0">
                  {exercise.motion ? (
                    <div>{exercise.motion}</div>
                  ) : (
                    <div className="text-transparent">...</div>
                  )}
                </div>
                <div className="uppercase font-bold text-sm m-1 mt-0">
                  {exercise.muscle_group}
                </div>
              </div>
              {equipment && equipment.equipment_name !== "other" ? (
                <div className="flex items-center font-bold uppercase text-lg">
                  {equipment.equipment_name}
                </div>
              ) : (
                <></>
              )}
              <div className="flex items-center ml-auto w-[15%] m-1 relative">
                <div className="absolute w-full h-7 bg-zinc-200 rounded border-black border-[1px] overflow-hidden">
                  <div
                    className={`h-full ${
                      exercise.level === "expert"
                        ? "bg-red-500"
                        : exercise.level === "intermediate"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width:
                        exercise.level === "expert"
                          ? "100%"
                          : exercise.level === "intermediate"
                          ? "66%"
                          : "33%",
                    }}
                  ></div>
                </div>
                <div
                  className="relative z-10 w-full text-center text-2xl font-bold"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  {exercise.level}
                </div>
              </div>
            </div>
            {exercise.video_link ? (
              <div className="m-1 flex flex-row">
                <div className="flex items-center w-[50%] m-1">
                  <div className="m-5 ml-10 font-semibold text-white text-lg py-2 px-4 text-justify bg-zinc-400/75 border-black border-[1px]">
                    {exercise.body}
                  </div>
                </div>
                <div className="flex flex-col aspect-video justify-center items-center w-[50%] font-mono m-1">
                  <iframe
                    className="border-black border-[1px] aspect-video w-[90%]"
                    src={`${exercise.video_link}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="flex items-center m-1">
                <div className="m-5 mx-10 font-semibold text-lg bg-zinc-400/75 p-2 border-black border-[1px] text-justify">
                  {exercise.body}
                </div>
              </div>
            )}
            <div className="flex flex-nowrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-min m-[1px] text-sm font-bold text-black m-3">
              <Link
                href={`/exercises`}
                className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                ←{" "}
                <div className="text-xl pt-1 ml-3 whitespace-nowrap">
                  {" "}
                  back to <span className="uppercase">EXERCISES</span>
                </div>
              </Link>{" "}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20">
          <div
            className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Error, Not Loading.
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="flex flex-col mx-10 m-1 w-[40%]">
<div className="flex flex-col items-center m-1">
  <div className="text-2xl font-bold m-1">Target Muscle: </div>
  <div className="text-lg font-bold m-1">
    {exercise.muscle_group}
  </div>
</div>
<div className="flex flex-col items-center mt-0 m-1">
  <div className="text-2xl font-bold m-1">Motion: </div>
  <div className="text-lg font-bold m-1">{exercise.motion}</div>
</div>
<div className="flex flex-col items-center mt-0 m-1">
  <div className="text-2xl font-bold m-1">Difficulty: </div>
  <div className="text-lg font-bold m-1">{exercise.level}</div>
</div>
</div> */
}
