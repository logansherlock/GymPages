import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import LoadingScreen from "./loading-screen";

const UserHistory = ({ user_id }: { user_id: string }) => {
  const { isLoggedIn, username, userID, membership } = useAuth();

  const [reviews, setReviews] = useState<any[]>([]);
  const [rev_loading, setRevLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [post_loading, setPostLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [com_loading, setComLoading] = useState(true);

  useEffect(() => {
    if (!user_id) return;
    fetch(`/api/reviews/reviews-by-user/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched reviews:", data);
        setReviews(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setReviews([]);
      })
      .finally(() => {
        setRevLoading(false);
      });
  }, [user_id]);

  useEffect(() => {
    if (!user_id) return;
    fetch(`/api/user-history/posts/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched posts:", data);
        setPosts(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setPosts([]);
      })
      .finally(() => {
        setPostLoading(false);
      });
  }, [user_id]);

  useEffect(() => {
    if (!user_id) return;
    fetch(`/api/user-history/comments/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched comments:", data);
        setComments(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setComments([]);
      })
      .finally(() => {
        setComLoading(false);
      });
  }, [user_id]);

  return (
    <div className="m-[1px] font-mono">
      {rev_loading || post_loading || com_loading ? (
        <LoadingScreen text="Loading Posts" />
      ) : isLoggedIn && userID === 0 ? (
        <div className="m-[1px]">
          <div className="flex flex-row justify-center gap-4 m-[1px]">
            <div className="w-[30%] flex flex-col m-2 gap-y-7">
              <div
                className="flex justify-center m-[1px] font-bold text-3xl"
                style={{ WebkitTextStroke: "1px black" }}
              >
                gym reviews
              </div>
              {Array.isArray(reviews) &&
                reviews.map((review) => (
                  <div key={review.review_id}>
                    <div className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] mb-4">
                      <div className="flex justify-between w-full">
                        <div className="text-lg font-semibold mx-2">REVIEW</div>
                      </div>
                      <div className="text-[12px] bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px]">
                        {review.body}
                      </div>
                      <div className="flex flex-wrap">
                        <div className="ml-auto text-xs mx-2 font-bold">
                          {formatDate(review.review_date)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="w-[30%] flex flex-col m-2 gap-y-7">
              <div
                className="flex justify-center m-[1px] font-bold text-3xl"
                style={{ WebkitTextStroke: "1px black" }}
              >
                community board posts
              </div>
              {Array.isArray(posts) &&
                posts.map((post) => (
                  <div key={post.post_id}>
                    <div className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] mb-4">
                      <div className="flex justify-between w-full">
                        <div className="text-lg font-semibold mx-2">POST</div>
                      </div>
                      <div className="text-[12px] bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px]">
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

            <div className="w-[30%] flex flex-col m-2 gap-y-7">
              <div
                className="flex justify-center m-[1px] font-bold text-3xl"
                style={{ WebkitTextStroke: "1px black" }}
              >
                post comments
              </div>
              {Array.isArray(comments) &&
                comments.map((comment) => (
                  <Link
                    href={`/posts/${comment.post_id}`}
                    key={comment.comment_id}
                  >
                    <div className="cursor-pointer hover:scale-[1.005] transition-transform text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] mb-4">
                      <div className="flex justify-between w-full">
                        <div className="text-lg font-semibold mx-2">
                          COMMENT
                        </div>
                      </div>
                      <div className="text-[12px] bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px]">
                        {comment.body}
                      </div>
                      <div className="flex flex-wrap">
                        <div className="ml-auto text-xs mx-2 font-bold">
                          {formatDate(comment.comment_date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
          <div
            className="w-full max-w-s m-4 text-center text-4xl font-bold"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Must be logged in and a member of this gym to view posts.
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-[1px]">
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

export default UserHistory;
