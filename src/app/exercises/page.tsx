import Link from "next/link";

type Exercise = {
  exercise_id: string;
  exercise_name: string;
};

export default async function ExercisesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercises/exercise-list`, {
    cache: "force-cache",
  });
  const exercises: Exercise[] = await res.json();

  // Group ranges
  const ranges = [
    { label: "A–D", start: "A", end: "C" },
    { label: "E–H", start: "E", end: "H" },
    { label: "I–L", start: "I", end: "L" },
    { label: "M–P", start: "M", end: "P" },
    { label: "Q–Z", start: "Q", end: "Z" },
  ];

  const groupByRange = (rangeStart: string, rangeEnd: string) => {
    return exercises.filter((exercise) => {
      const firstLetter = exercise.exercise_name[0].toUpperCase();
      return firstLetter >= rangeStart && firstLetter <= rangeEnd;
    });
  };

  return (
    <div className="text-white">
      {exercises.length === 0 ? (
        <div className="flex justify-center items-center min-h-screen text-5xl font-bold">
          No exercises found.
        </div>
      ) : (
        <div className="flex flex-col items-center bg-stone-500 p-5 border-[1px] border-black gap-5 w-full max-w-3xl mx-auto">
          <div
            className="text-5xl font-bold"
            style={{
              WebkitTextStroke: "1px black",
            }}
          >
            EXERCISES
          </div>

          {ranges.map((range) => {
            const grouped = groupByRange(range.start, range.end);
            return (
              <details
                key={range.label}
                className="w-full max-w-2xl bg-stone-400/75 border border-black p-3"
              >
                <summary className="text-3xl font-semibold my-1 cursor-pointer hover:scale-[1.1] transition-transform transform origin-left">
                  {range.label}
                </summary>
                <ul className="mt-3">
                  {grouped.map((exercise) => (
                    <li key={exercise.exercise_id}>
                      <Link
                        href={`/exercises/${exercise.exercise_id}`}
                        className="text-xl font-semibold block my-1 cursor-pointer hover:scale-[1.25] transition-transform transform origin-left"
                      >
                        {exercise.exercise_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}