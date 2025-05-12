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
    if (!post_id) return;
    fetch(`/api/community-board/post/${post_id}/comments/`)
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

  const handleDeleteComments = async (comment_id: string) => {
    try {
      const res = await fetch(
        `/api/community-board/post/${post_id}/comments/${comment_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-zinc-500 border-black border-[1px] p-3 pb-8">
      {post_loading || gym_loading || com_loading ? (
        <LoadingScreen text="Loading Post" />
      ) : isLoggedIn && gym && (membership == gym.gym_id || userID === 0) ? (
        <div className="m-[1px]">
          {post && gym ? (
            <div className="m-[1px]">
              <div className="flex flex-wrap font-mono text-white m-[1px] ">
                <div className="flex flex-wrap items-center bg-zinc-400/75 border-black border-[1px] px-2 max-w-s m-[1px] text-sm shrink font-bold text-black">
                  <Link
                    href={`/community-board/${gym.gym_id}`}
                    className="flex flex-row items-center text-white text-5xl font-bold ml-2 mr-4"
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    ←{" "}
                    <span className="text-xl pt-1 ml-3">
                      {" "}
                      back to <span className="uppercase">COMMUNITY BOARD</span>
                    </span>
                  </Link>{" "}
                </div>
                <div
                  className="flex flex-wrap items-center max-w-s m-[1px] ml-auto uppercase text-4xl shrink font-bold"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  {gym.gym_name} BOARD POST
                </div>
              </div>
              <div className="flex flex-wrap items-center m-[1px] ">
                <nav className="flex flex-wrap gap-6 justify-between m-[1px] ml-auto">
                  <Link
                    href={`/add/add-comment/${post_id}`}
                    className="cursor-pointer hover:scale-[1.05] transition-transform text-center text-white bg-zinc-400 border-black border-[1px] pl-1 pr-1 font-bold rounded"
                  >
                    Add Comment
                  </Link>
                </nav>
              </div>
              <div className="flex flex-wrap items-center justify-center m-[1px]">
                <div className="w-[60%] text-white font-mono bg-zinc-700 rounded-xl p-1 border-black border-[1px] mb-5">
                  <div className="flex justify-between w-full">
                    <Link
                      href={`/profile/${post.user_id}`}
                      className="cursor-pointer hover:scale-[1.05] transition-transform text-3xl font-semibold mx-2"
                    >
                      {post.username}
                    </Link>
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
              {comments && comments.length > 0 ? (
                <div className="flex flex-wrap justify-center m-[1px]">
                  <div className="w-[50%] flex flex-wrap flex-col justify-between gap-y-5 m-[1px]">
                    <div
                      className="flex flex-wrap justify-center font-mono text-white font-bold text-3xl m-[1px]"
                      style={{ WebkitTextStroke: "1px black" }}
                    >
                      comments
                    </div>
                    {comments.map((comment, index) => (
                      <div
                        key={comment.comment_id}
                        className="text-white font-mono bg-zinc-700 rounded-xl p-1 pb-0 border-black border-[1px] m-[1px] "
                      >
                        <div className="flex justify-between w-full">
                          <Link
                            href={`/profile/${comment.user_id}`}
                            className="cursor-pointer hover:scale-[1.05] transition-transform font-semibold mx-1"
                          >
                            {comment.username}
                          </Link>
                        </div>
                        <div className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl border-black border-[1px]">
                          {comment.body}
                        </div>
                        <div className="flex flex-wrap p-1">
                          {(userID === 0 || comment.user_id === userID) && (
                            <div>
                              <button
                                onClick={() =>
                                  handleDeleteComments(comment.comment_id)
                                }
                                className="cursor-pointer hover:scale-[1.05] text-white transition-transform text-center bg-red-500 border-black border-[1px] pl-1 pr-1 font-bold rounded"
                              >
                                delete
                              </button>
                            </div>
                          )}
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
          <div
            className="w-full max-w-s m-4 text-center text-4xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Must be logged in and a member of the same gym to view posts...
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20 m-[1px]">
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
