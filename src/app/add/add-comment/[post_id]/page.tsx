"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import AddComment from "@/app/components/add-comment";
import LoadingScreen from "@/app/components/loading-screen";

export default function Post() {
  const [post, setPost] = useState<any | null>(null);
  const [gym, setGym] = useState<any | null>(null);
  const [post_loading, setPostLoading] = useState(true);
  const [gym_loading, setGymLoading] = useState(true);
  const { post_id } = useParams();

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    // if post_id doesn't exist, exit
    if (!post_id) return;

    // GET() method from post API by post_id
    fetch(`/api/community-board/post/${post_id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched post:", data);
        // set post information
        setPost(data);
        setPostLoading(false);
        console.log("Current post object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [post_id]);

  useEffect(() => {
    // if post doesn't have a gym_id, exit
    if (!post?.gym_id) return;

    // GET() method from gym API by gym_id
    fetch(`/api/gyms/${post.gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);
        // set gym information
        setGym(data);
        setGymLoading(false);
        console.log("Current gym object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [post]);

  return (
    <div className="bg-zinc-500 border-black border-[1px] p-3">
      {post_loading || gym_loading ? (
        <LoadingScreen text="Loading Post" />
      ) : isLoggedIn && gym && (membership == gym.gym_id || userID === 0) ? (
        <div className="">
          {post && gym ? (
            <div className="m-[1px]">
              <div className="flex flex-wrap m-[1px] font-mono text-white m-[1px] ">
                <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
                  <Link
                    href={`/posts/${post_id}`}
                    className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    ←{" "}
                    <span className="text-xl pt-1 ml-3">
                      {" "}
                      back to <span className="uppercase">POST</span>
                    </span>
                  </Link>{" "}
                </div>
                <div
                  className="flex flex-wrap items-center max-w-s m-[1px] ml-auto uppercase text-5xl shrink font-bold"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  {gym.gym_name} BOARD POST
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center m-[1px]">
                <div className="w-[60%] text-white font-mono bg-zinc-700 rounded-xl p-1 border-black border-[1px] m-10 mb-5">
                  <div className="flex justify-between w-full">
                    <div className="text-3xl font-semibold mx-2">
                      {post.username}
                    </div>
                  </div>
                  <div className="text-xl bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px]">
                    {post.body}
                  </div>
                  <div className="flex flex-wrap">
                    <div className="text-sm ml-auto font-bold mx-2">
                      {formatDate(post.post_date)}
                    </div>
                  </div>
                </div>
              </div>
              <AddComment post_id={post_id as string}></AddComment>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20">
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Error, not loading.
              </div>
            </div>
          )}
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
          <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
            Must be logged in and a member of the same gym to view posts...
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
          <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
            Must be a member of this gym to view posts...
          </div>
        </div>
      )}
    </div>
  );
}
