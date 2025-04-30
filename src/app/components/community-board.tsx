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

  return (
    <div className="m-1">
      {loading ? (
        <LoadingScreen text="Loading Community Board" />
      ) : isLoggedIn && (membership == gym_id || userID === 0) ? (
        <div className="m-1">
          <div className="flex flex-wrap items-center m-1">
            <nav className="flex flex-wrap gap-6 justify-between m-1 ml-auto">
              <Link
                href={`/add-post/${gym_id}`}
                className="cursor-pointer hover:scale-[1.05] transition-transform text-center bg-stone-400 border-black border-[1px] pl-1 pr-1 font-bold rounded"
              >
                add-post
              </Link>
            </nav>
          </div>
          {posts.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
              <div
                className="w-full max-w-s m-4 text-center text-5xl font-bold"
                style={{ WebkitTextStroke: "1px black" }}
              >
                No posts found...
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center m-1">
              <div className="w-[60%] flex flex-wrap flex-col m-2 gap-y-7">
                {posts.map((post) => (
                  <Link href={`/posts/${post.post_id}`} key={post.post_id}>
                    <div className="cursor-pointer hover:scale-[1.005] transition-transform text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px] mb-4">
                      <div className="flex justify-between w-full">
                        <div className="text-2xl font-semibold mx-2">
                          {post.username}
                        </div>
                      </div>
                      <div className="text-[18px] bg-white text-black font-semibold p-2 rounded-xl m-1 border-black border-[2px]">
                        {post.body}
                      </div>
                      <div className="flex flex-wrap">
                        <div className="ml-auto text-xs mx-2 font-bold mx-2">
                          {formatDate(post.post_date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
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
            Must be logged in and a member of this gym to view posts.
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
          <div
            className="w-full max-w-s m-4 text-center text-4xl font-bold"
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
