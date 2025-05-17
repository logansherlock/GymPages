"use client";
import { useAuth } from "@/hooks/useAuth";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingScreen from "@/app/components/loading-screen";
import ProfileReviews from "@/app/components/profiles-reviews";
import ProfilePosts from "@/app/components/profiles-posts";
import Link from "next/link";

export default function Profile() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, username, userID, membership } = useAuth();
  const { user_id } = useParams();

  useEffect(() => {
    // if user_id doesn't exist, exit
    if (!user_id) return;

    const fetchExercise = async () => {
      try {
        // GET() method from profile API by user_id
        const res = await fetch(`/api/profile/${user_id}`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        console.log(data);
        setProfile(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [user_id]);

  // retrieve initials based on user's first and last names
  const getInitials = (first: string, last: string) => {
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  // random color chooser so webpage is different every refresh
  const getRandomColorClass = () => {
    const colorClasses = [
      "bg-red-500",
      "bg-red-600",
      "bg-red-700",
      "bg-blue-500",
      "bg-blue-600",
      "bg-blue-700",
      "bg-green-500",
      "bg-green-600",
      "bg-green-700",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
      "bg-yellow-500",
      "bg-yellow-600",
      "bg-yellow-700",
      "bg-pink-500",
      "bg-pink-600",
      "bg-pink-700",
      "bg-indigo-500",
      "bg-indigo-600",
      "bg-indigo-700",
      "bg-teal-500",
      "bg-teal-600",
      "bg-teal-700",
      "bg-orange-500",
      "bg-orange-600",
      "bg-orange-700",
    ];
    const index = Math.floor(Math.random() * colorClasses.length);
    console.log("Selected color class:", colorClasses[index]);
    return colorClasses[index];
  };

  console.log(userID, user_id);

  return (
    <div>
      {loading ? (
        <LoadingScreen text="Loading Profile" />
      ) : profile && isLoggedIn ? (
        <div className="bg-zinc-500 border-black text-white border-[1px] p-4">
          <div className="flex flex-row items-center mb-3 m-[1px]">
            <div
              className="flex flex-wrap items-center uppercase max-w-s text-5xl shrink font-bold m-[1px]"
              style={{ WebkitTextStroke: "1px black" }}
            >
              {profile.username} PROFILE
            </div>
            {userID === Number(user_id) && (
              <nav className="ml-auto flex flex-wrap justify-between m-[1px]">
                <Link
                  href={`/profile/${userID}/edit`}
                  className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-zinc-400 border-black border-[1px] px-2 font-bold rounded"
                >
                  Edit Profile
                </Link>
              </nav>
            )}
          </div>
          <div className="flex flex-row m-[1px]">
            <div
              className={`w-36 h-32 rounded-full text-white flex items-center justify-center border-black border-[1px] text-6xl font-bold ${getRandomColorClass()} m-[1px]`}
            >
              {getInitials(profile.firstname, profile.lastname)}
            </div>
            <div className="flex flex-col items-center justify-center w-full m-[1px]">
              {profile.visibility === "private" ? (
                <div className="flex flex-col m-[1px] items-center justify-center font-bold text-4xl bg-red-800 border-black border-[1px] p-2">
                  🔒 This user is private.
                </div>
              ) : (
                <div className="flex flex-row justify-between items-center w-full m-[1px] text-xl font-semibold space-x-4">
                  <div className="flex flex-col uppercase text-left m-[1px] ml-5">
                    <div className="m-[1px] text-4xl">
                      {profile.firstname} {profile.lastname}
                    </div>
                    {profile.gym_member ? (
                      <div className="m-[2px]">
                        {profile.gym_name} of {profile.city}, {profile.state}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="m-[1px]">
                    <table className="border-white border-[1px]">
                      <caption className="text-sm">
                        Personal Records (lbs)
                      </caption>
                      <thead className={`${getRandomColorClass()}`}>
                        <tr>
                          <th className="w-[100px] border-white border-[1px]">
                            BENCH
                          </th>
                          <th className="w-[100px] border-white border-[1px]">
                            SQUAT
                          </th>
                          <th className="w-[150px] border-white border-[1px]">
                            DEADLIFT
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center bg-zinc-400">
                        <tr>
                          <td className="w-[100px] border-white border-[1px]">
                            {profile.max_bench ?? "-"}
                          </td>
                          <td className="w-[100px] border-white border-[1px]">
                            {profile.max_squat ?? "-"}
                          </td>
                          <td className="w-[100px] border-white border-[1px]">
                            {profile.max_dead ?? "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {membership === profile.gym_member || userID === 0 ? (
                <div className="flex flex-row justify-center items-start bg-zinc-400 border-black border-[1px] w-[80%] mt-8 text-3xl font-bold uppercase gap-x-5 py-2 px-5">
                  <div className="w-1/2">
                    <ProfileReviews user_id={user_id as string} />
                  </div>
                  <div className="w-1/2">
                    <ProfilePosts user_id={user_id as string} />
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center mt-8">
                  <div className="bg-zinc-400 border-black border-[1px] w-[60%] flex justify-center items-center text-3xl font-bold uppercase py-2 px-5">
                    <ProfileReviews user_id={user_id as string} />
                  </div>
                </div>
              )}
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
              USER PROFILE
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Must be logged in to view profiles.
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Cannot find profile.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
