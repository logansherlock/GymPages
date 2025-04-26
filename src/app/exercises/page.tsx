"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Exercises() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetch(`/api/exercises/exercise-list`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExercises(data);
        } else {
          console.error("Expected array, got:", data);
          setExercises([]);
        }
      })
      .catch((err) => console.log("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="m-10 font-mono">
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
          <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
            Loading Exercises...
          </div>
        </div>
      ) : (
        <div className="m-1">
          {exercises.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
              <div
                className="w-full max-w-s m-4 text-center text-5xl font-bold"
                style={{ WebkitTextStroke: "2px black" }}
              >
                No exercises found.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center m-1">
              <div className="flex flex-wrap flex-col items-center m-1 gap-y-5 bg-stone-500 p-5 border-black border-[2px]">
                <div
                  className="m-1 text-5xl font-bold"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  EXERCISES A-Z
                </div>

                <div className="flex flex-col items-center m-1 bg-stone-400/75 border-black border-[1px]">
                  {exercises.map((exercise) => (
                    <Link
                      href={`/exercises/${exercise.exercise_id}`}
                      key={exercise.exercise_id}
                      className="text-2xl font-mono font-bold m-2 mx-10"
                    >
                      {exercise.exercise_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      ;
    </div>
  );
}
