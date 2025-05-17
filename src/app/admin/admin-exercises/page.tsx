"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function ExercisePage() {
  const [exercises, setExercises] = useState<any[]>([]); // Ensure it's an array
  const [exercises_loading, setExercisesLoading] = useState(true);
  const { isLoggedIn, username, userID, membership } = useAuth();

  // function to delete exercise from database by exercise_id
  const handleDeleteExercise = async (exercise_id: string) => {
    // confirmation check
    const confirmed = window.confirm("Are you sure you want to delete this exercise?");
    // if not confirmed
    if (!confirmed) return;

    try {
      // DELETE() method from admin-exercise API by exercise_id
      const res = await fetch(`/api/admin/exercises/${exercise_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setExercises((prevExercises) =>
          prevExercises.filter(
            (exercise) => exercise.exercise_id !== exercise_id
          )
        );
      } else {
        console.error("Failed to delete exercise");
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  useEffect(() => {
    // GET() method from admin-exercise API
    fetch("/api/admin/exercises")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched exercises:", data);
        if (Array.isArray(data)) {
          setExercises(data);
        } else {
          console.error("Expected an array but got:", data);
          setExercises([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => {
        setExercisesLoading(false);
      });
  }, []);

  return (
    <div className="">
      {isLoggedIn && userID === 0 ? (
        <div className=" bg-zinc-500 border-black border-[1px] p-3">
          <div className="flex flex-wrap justify-center font-mono text-white m-[1px] ">
            <div
              className="flex flex-wrap items-center max-w-s m-[1px] text-5xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              EXERCISES
            </div>
            <nav className="flex ml-auto items-center m-[1px] flex-wrap gap-6 justify-between m-[1px]">
              <Link
                href={`/admin/admin-exercises/add-exercise`}
                className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-zinc-400 border-black border-[1px] px-2 font-bold rounded"
              >
                Add Exercise
              </Link>
            </nav>
          </div>
          <div className="flex flex-wrap justify-center m-1">
            {exercises.length > 0 ? (
              <table className="w-full table-auto">
                <thead className="bg-zinc-700 text-stone-100 ">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">
                      exercise_id
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      exercise_name
                    </th>
                    <th className="px-4 py-2 border border-gray-300">motion</th>
                    <th className="px-4 py-2 border border-gray-300">level</th>
                    <th className="px-4 py-2 border border-gray-300">
                      mechanic
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      functions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exercise, index) => (
                    <tr
                      key={exercise.exercise_id}
                      className={
                        index % 2 === 0 ? "bg-zinc-400" : "bg-neutral-500"
                      }
                    >
                      <td className="px-4 py-1.5 border border-gray-300 font-bold">
                        {exercise.exercise_id}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {exercise.exercise_name}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {exercise.motion}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {exercise.level}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300">
                        {exercise.mechanic}
                      </td>
                      <td className="px-4 py-1.5 border border-gray-300 text-center font-bold">
                        <Link
                          href={`/exercises/${exercise.exercise_id}`}
                          className="bg-yellow-500 text-white h-6 px-1 py-[3px] text-sm rounded hover:bg-yellow-600 mr-3 border-black border-[1px]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteExercise(exercise.exercise_id)
                          }
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
              <p>No exercises found.</p>
            )}
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
              className="flex flex-wrap items-center max-w-s m-[1px] ml-auto text-4xl shrink font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              EXERCISES
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in and admin to view exercises.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
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
