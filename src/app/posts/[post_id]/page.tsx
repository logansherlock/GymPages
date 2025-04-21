"use client";
import { useAuth } from "@/hooks/useAuth";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";

export default function Post() {
  const [post, setPost] = useState<any | null>(null);
  const [gym, setGym] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [ post_loading, setPostLoading] = useState(true);
  const [ gym_loading, setGymLoading] = useState(true);
  const [ com_loading, setCommentsLoading] = useState(true);
  const { post_id } = useParams();

  const { isLoggedIn, username, membership } = useAuth();

  useEffect(() => {
    console.log("page.tsx post_id type:", typeof post_id); // Log the type of gym_id
    fetch(`/api/community-board-post/${post_id}`)
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

    fetch(`/api/gyms/${post.gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched gym:", data);
        setGym(data);
        setGymLoading(false);
        console.log("Current gym object:", data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [post]);

  useEffect(() => {
    fetch(`/api/comments/${post_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
          console.log(data);
        } else {
          console.error("Expected array, got:", data);
          setComments([]);
        }
        setCommentsLoading(false);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, [post_id]);

  return (
    <div className="m-2">
      {post_loading || gym_loading || com_loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
          <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
            Loading Post...
          </div>
        </div>
      ) : isLoggedIn && gym && membership == gym.gym_id ? (
        <div className="m-1">
          {post && gym ? (
            <div className="m-1">
              <div className="flex flex-wrap m-1 font-mono text-white m-1 ">
                <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold">
                  <Link
                    href={`/community-board/${gym.gym_id}`}
                    className="text-white text-4xl font-bold ml-2 mr-4"
                  >
                    ←
                  </Link>{" "}
                  back to community board
                </div>
                <div className="flex flex-wrap items-center max-w-s m-1 ml-auto text-4xl shrink font-bold">
                  BOARD POST
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center m-1">
                <div className="w-[60%] text-white font-mono bg-stone-600 rounded-xl p-2 border-black border-[3px] m-10 mb-5">
                  <div className="flex justify-between w-full">
                    <div className="text-3xl font-semibold">
                      {post.username}
                    </div>
                    <div className="text-sm">{formatDate(post.post_date)}</div>
                  </div>
                  <div className="text-xl bg-white text-black font-semibold p-2 rounded-xl">
                    {post.body}
                  </div>
                </div>
              </div>
              {comments && comments.length > 0 ? (
                <div className="flex flex-wrap justify-center m-1">
                  <div className="w-[50%] flex flex-wrap flex-col justify-between gap-y-5 m-1">
                    <div className="flex flex-wrap justify-center font-mono font-bold text-lg m-1">
                      comments
                    </div>
                    {comments.map((comment, index) => (
                      <div
                        key={comment.comment_id}
                        className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px] m-1 "
                      >
                        <div className="flex justify-between w-full">
                          <div className="text-lg font-semibold">
                            {comment.username}
                          </div>
                        </div>
                        <div className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl">
                          {comment.body}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
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
