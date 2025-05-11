import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import LoadingScreen from "./loading-screen";

const CommunityBoard = ({ gym_id }: { gym_id: string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, username, userID, membership } = useAuth();
  console.log(
    "isLoggedIn:",
    isLoggedIn,
    ", username:",
    username,
    ", user_id:",
    userID,
    ", membership:",
    membership
  ); // Debugging log

  useEffect(() => {
    if (!gym_id) {
      console.log("no gym_id in community-board.tsx");
      return;
    }
    console.log("community-board.tsx gym_id:", gym_id); // Log the type of gym_id

    fetch(`/api/community-board/board/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected array, got:", data);
          setPosts([]);
        }
      })
      .catch((err) => console.log("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [gym_id]);

  const handlePostReview = async (post_id: string) => {
    try {
      const res = await fetch(`/api/community-board/post/${post_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((r) => r.post_id !== post_id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="m-[1px]">
      {loading ? (
        <LoadingScreen text="Loading Community Board" />
      ) : isLoggedIn && (membership == gym_id || userID === 0) ? (
        <div className="m-[1px]">
          <div className="flex flex-wrap items-center m-[1px]">
            <nav className="flex flex-wrap gap-6 justify-between m-[1px] ml-auto">
              <Link
                href={`/add-post/${gym_id}`}
                className="cursor-pointer hover:scale-[1.05] transition-transform text-white text-center bg-stone-400 border-black border-[1px] pl-1 pr-1 font-bold rounded"
              >
                Add Post
              </Link>
            </nav>
          </div>
          {posts.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-screen font-mono pb-20">
              <div
                className=" max-w-s m-4 text-center text-4xl text-white font-bold bg-red-800 border-black border-[1px] p-4"
                style={{ WebkitTextStroke: "1px black" }}
              >
                No posts found...
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center m-[1px] mt-5">
              <div className="w-[60%] flex flex-wrap flex-col m-2 gap-y-7">
                {posts.map((post) => (
                  <div
                    key={post.post_id}
                    className="cursor-pointer hover:scale-[1.005] transition-transform text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] mb-4"
                    onClick={() =>
                      (window.location.href = `/posts/${post.post_id}`)
                    }
                  >
                    <div className="flex justify-between w-full">
                      <Link
                        href={`/profile/${post.user_id}`}
                        className="cursor-pointer hover:scale-[1.05] transition-transform text-2xl font-semibold mx-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {post.username}
                      </Link>
                    </div>
                    <div className="text-[18px] bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px]">
                      {post.body}
                    </div>
                    <div className="flex flex-wrap items-center p-1">
                      {(userID === 0 || post.user_id === userID) && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handlePostReview(post.post_id)}
                            className="cursor-pointer hover:scale-[1.05] text-white transition-transform text-center bg-red-500 border-black border-[1px] pl-1 pr-1 font-bold rounded"
                          >
                            delete
                          </button>
                        </div>
                      )}
                      <div className="ml-auto text-xs mx-2 font-bold">
                        {formatDate(post.post_date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
          <div
            className="w-full max-w-s m-4 text-center text-white text-4xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Must be logged in and a member of this gym to view posts.
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
          <div
            className="w-full max-w-s m-4 text-center text-white text-4xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Must be a member of this gym to view posts.
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityBoard;
