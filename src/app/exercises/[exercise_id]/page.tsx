import Link from "next/link";
import LoadingScreen from "@/app/components/loading-screen";

export default function ExercisePage({ exercise, equipment }: { exercise: any; equipment: any }) {
  return (
    <div className="">
      {exercise ? (
        <div className="">
          <div className="bg-stone-500 border-black border-[1px] p-1">
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
                  <div className="m-5 ml-10 font-semibold text-white text-lg py-2 px-4 text-justify bg-stone-400/75 border-black border-[1px]">
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
                <div className="m-5 mx-10 font-semibold text-lg bg-stone-400/75 p-2 border-black border-[1px] text-justify">
                  {exercise.body}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap font-mono items-center max-w-s text-sm shrink text-black font-bold text-black">
            <Link
              href={`/exercises`}
              className="text-white text-4xl font-bold ml-1 mr-4"
              style={{ WebkitTextStroke: "1px black" }}
            >
              ←
            </Link>{" "}
            back to exercises
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
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

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercises/exercise-list`);
  const data = await res.json();

  const paths = data.map((ex: any) => ({
    params: { exercise_id: ex.exercise_id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const exerciseRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercises/exercise-by-id/${params.exercise_id}`);
  const exercise = await exerciseRes.json();

  let equipment = null;
  if (exercise.related_equip_id) {
    const equipRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/equipment/${exercise.related_equip_id}`);
    equipment = await equipRes.json();
  }

  return {
    props: {
      exercise,
      equipment,
    },
  };
}
