import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";

const CommunityBoard = ({ gym_id }: { gym_id: string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, username, membership } = useAuth();

  console.log(formatDate("2025-04-19T02:03:28.000Z"));
  // Output: Apr. 19th 2025 at 2:03
  useEffect(() => {
    if (!gym_id) {
      console.log("no gym_id in community-board.tsx");
      return;
    }
    console.log("community-board.tsx gym_id:", gym_id); // Log the type of gym_id

    fetch(`/api/community-board/${gym_id}`)
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
    <div>
      {loading ? (
        <div className="text-white">Loading Community Posts...</div>
      ) : isLoggedIn && membership == gym_id ? (
        <div>
          {posts.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
              <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
                No posts found...
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center m-2">
              <div className="w-[60%] flex flex-wrap flex-col m-2 justify-between gap-y-10">
                {posts.map((post) => (
                  <Link href={`/posts/${post.post_id}`} key={post.post_id}>
                    <div className="cursor-pointer hover:scale-[1.005] transition-transform text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px] mb-4">
                      <div className="flex justify-between w-full">
                        <div className="text-lg font-semibold">
                          {post.username}
                        </div>
                        <div className="text-sm">
                          {formatDate(post.post_date)}
                        </div>
                      </div>
                      <div className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl">
                        {post.body}
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
          <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
            Must be logged in and a member of this gym to view posts.
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
          <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
            Must be a member of this gym to view posts.
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityBoard;
