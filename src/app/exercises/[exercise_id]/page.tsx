"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ExercisePage() {
  const [exercise, setExercise] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const { exercise_id } = useParams();

  useEffect(() => {
    console.log("page.tsx exercise_id type:", typeof exercise_id);
    fetch(`/api/exercises/${exercise_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched exercise:", data);

        setTimeout(() => {
          setExercise(data);
          setLoading(false);
        }, 1000);

        console.log("Current exercise object:", data);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, [exercise_id]);

  return (
    <div className="m-2 ml-3">
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
            Loading Exercise Data...
          </div>
        </div>
      ) : exercise ? (
        <div className="m-1">
          <div className="flex m-1 font-mono text-white">
            <div className="flex items-center uppercase max-w-s m-1 text-4xl shrink font-bold">
              {exercise.exercise_name}
            </div>
            <div className="flex flex-col text-left ml-5 m-1">
              <div className="uppercase font-bold text-sm m-1 mb-0">
                {exercise.motion ? (<div>{exercise.motion}</div>) : (<div className="text-transparent">...</div>)}
              </div>
              <div className="uppercase font-bold text-sm m-1 mt-0">
                {exercise.muscle_group}
              </div>
            </div>
          </div>
          <div className="m-5 ml-10 mr-10 font-semibold text-lg">
            {exercise.body}
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
