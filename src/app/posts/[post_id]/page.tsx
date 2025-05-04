"use client";
import { useAuth } from "@/hooks/useAuth";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import LoadingScreen from "@/app/components/loading-screen";

export default function Post() {
  const [post, setPost] = useState<any | null>(null);
  const [gym, setGym] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [post_loading, setPostLoading] = useState(true);
  const [gym_loading, setGymLoading] = useState(true);
  const [com_loading, setCommentsLoading] = useState(true);
  const { post_id } = useParams();

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    if (!post_id) return;
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

  useEffect(() => {
    if (!post_id) return;
    fetch(`/api/community-board/comments-by-post/${post_id}`)
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
        <LoadingScreen text="Loading Post" />
      ) : isLoggedIn && gym && (membership == gym.gym_id || userID === 0) ? (
        <div className="m-1">
          {post && gym ? (
            <div className="m-1">
              <div className="flex flex-wrap m-1 font-mono text-white m-1 ">
                <div className="flex flex-wrap items-center max-w-s m-1 text-sm shrink font-bold text-black">
                  <Link
                    href={`/community-board/${gym.gym_id}`}
                    className="text-white text-4xl font-bold ml-2 mr-4"
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    ←
                  </Link>{" "}
                  back to community board
                </div>
                <div
                  className="flex flex-wrap items-center max-w-s m-1 ml-auto uppercase text-4xl shrink font-bold"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  {gym.gym_name} BOARD POST
                </div>
              </div>
              <div className="flex flex-wrap items-center m-1 ">
                <nav className="flex flex-wrap gap-6 justify-between m-1 ml-auto">
                  <Link
                    href={`/add-comment/${post_id}`}
                    className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-stone-400 border-black border-[1px] pl-1 pr-1 font-bold rounded"
                  >
                    add-comment
                  </Link>
                </nav>
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
              {comments && comments.length > 0 ? (
                <div className="flex flex-wrap justify-center m-1">
                  <div className="w-[50%] flex flex-wrap flex-col justify-between gap-y-5 m-1">
                    <div
                      className="flex flex-wrap justify-center font-mono font-bold text-3xl m-1 mt-5"
                      style={{ WebkitTextStroke: "1px black" }}
                    >
                      comments
                    </div>
                    {comments.map((comment, index) => (
                      <div
                        key={comment.comment_id}
                        className="text-white font-mono bg-stone-600 rounded-xl p-1 pb-0 border-black border-[3px] m-1 "
                      >
                        <div className="flex justify-between w-full">
                          <div className=" font-semibold mx-1">
                            {comment.username}
                          </div>
                        </div>
                        <div className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl border-black border-[2px]">
                          {comment.body}
                        </div>
                        <div className="flex flex-wrap">
                          <div className="text-xs ml-auto font-bold mx-1">
                            {formatDate(comment.comment_date)}
                          </div>
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
              <div
                className=" max-w-s m-4 text-center text-4xl font-bold bg-red-800 border-black border-[2px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Error, not loading.
              </div>
            </div>
          )}
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
          <div
            className="w-full max-w-s m-4 text-center text-4xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Must be logged in and a member of the same gym to view posts...
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
          <div
            className="w-full max-w-s m-4 text-center text-4xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Must be a member of this gym to view posts...
          </div>
        </div>
      )}
    </div>
  );
}
