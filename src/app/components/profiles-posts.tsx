import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import LoadingScreen from "./loading-screen";
import Reviews from "./reviews";

const ProfilePosts = ({ user_id }: { user_id: string }) => {
  const { isLoggedIn, username, userID, membership } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);
  const [posts_loading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (!user_id) return;
    fetch(`/api/user-history/posts/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched reviews:", data);
        setPosts(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setPosts([]);
      })
      .finally(() => {
        setPostsLoading(false);
      });
  }, [user_id]);

  return (
    <div className="m-[1px] font-mono">
      {posts_loading ? (
        <LoadingScreen text="Loading Posts" />
      ) : posts.length ? (
        <div className="flex flex-row justify-center gap-4 m-[1px]">
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-y-4">
            {" "}
            <div
              className="flex justify-center m-[1px] text-white font-bold text-3xl"
              style={{ WebkitTextStroke: "1px black" }}
            >
              BOARD POSTS
            </div>
            {Array.isArray(posts) &&
              posts.map((post) => (
                <div key={post.post_id}>
                  <div className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] mb-4">
                    <div className="flex justify-between w-full">
                      <div className="text-xl font-semibold mx-2">POST</div>
                      <div className="text-xl font-semibold mx-2">{post.gym_name}</div>
                    </div>
                    <div className="text-base bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px] max-h-40 overflow-y-auto">
                      {post.body}
                    </div>
                    <div className="flex flex-wrap">
                      <div className="ml-auto text-xs mx-2 font-bold">
                        {formatDate(post.post_date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePosts;
