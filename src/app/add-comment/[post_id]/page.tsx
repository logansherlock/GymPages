"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import AddComment from "../../components/add-comment";

export default function Post() {
  const [post, setPost] = useState<any | null>(null);
  const [gym, setGym] = useState<any | null>(null);
  const [post_loading, setPostLoading] = useState(true);
  const [gym_loading, setGymLoading] = useState(true);
  const { post_id } = useParams();

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    console.log("page.tsx post_id type:", typeof post_id); // Log the type of gym_id
    fetch(`/api/community-board/post/${post_id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched post:", data);
        setPost(data);
        setPostLoading(false);
        console.log("Current post object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [post_id]);

  useEffect(() => {
    if (!post?.gym_id) return;

    fetch(`/api/gym-page/${post.gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);
        setGym(data);
        setGymLoading(false);
        console.log("Current gym object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [post]);

  return (
    <div className="m-2">
      {post_loading || gym_loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
            Loading Post...
          </div>
        </div>
      ) : isLoggedIn && gym && (membership == gym.gym_id || userID === 0) ? (
        <div className="">
          {post && gym ? (
            <div className="m-1">
              <div className="flex flex-wrap m-1 font-mono text-white m-1 ">
                <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold text-black">
                  <Link
                    href={`/posts/${post_id}`}
                    className="text-white text-4xl font-bold ml-2 mr-4"
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    ←
                  </Link>{" "}
                  back to post
                </div>
                <div className="flex flex-wrap items-center max-w-s m-1 ml-auto uppercase text-4xl shrink font-bold" style={{ WebkitTextStroke: "1px black" }}>
                  {gym.gym_name} BOARD POST
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center m-1">
                <div className="w-[60%] text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px] m-10 mb-5">
                  <div className="flex justify-between w-full">
                    <div className="text-3xl font-semibold mx-2">
                      {post.username}
                    </div>
                  </div>
                  <div className="text-xl bg-white text-black font-semibold p-2 rounded-xl m-1 border-black border-[2px]">
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
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
              <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
                Error, not loading.
              </div>
            </div>
          )}
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
          <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
            Must be logged in and a member of the same gym to view posts...
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
          <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
            Must be a member of this gym to view posts...
          </div>
        </div>
      )}
    </div>
  );
}
