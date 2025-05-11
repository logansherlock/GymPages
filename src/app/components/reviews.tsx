import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import LoadingScreen from "./loading-screen";

const Reviews = ({ gym_id }: { gym_id: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, username, userID, membership } = useAuth();

  useEffect(() => {
    if (!gym_id) {
      console.log("no gym_id in community-board.tsx");
      return;
    }
    console.log("community-board.tsx gym_id:", gym_id); // Log the type of gym_id

    fetch(`/api/reviews/reviews-by-gym/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Expected array, got:", data);
          setReviews([]);
        }
      })
      .catch((err) => console.log("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [gym_id]);

  const handleDeleteReview = async (review_id: string) => {
    try {
      const res = await fetch(`/api/reviews/${review_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.review_id !== review_id));
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
        <LoadingScreen text="Loading Reviews" />
      ) : (
        <div className="m-[1px]">
          <div className="flex flex-wrap items-center m-[1px] ">
            <nav className="flex flex-wrap gap-6 justify-between m-[1px] ml-auto">
              <Link
                href={`/add-review/${gym_id}`}
                className="cursor-pointer hover:scale-[1.05] text-white transition-transform text-center bg-stone-400 border-black border-[1px] pl-1 pr-1 font-bold rounded"
              >
                Leave Review
              </Link>
            </nav>
          </div>
          <div className="flex flex-wrap justify-center mt-5">
            {reviews.length === 0 ? (
              <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
                <div className="w-full max-w-s m-4 text-center text-white text-5xl font-bold">
                  No reviews found...
                </div>
              </div>
            ) : (
              <div className="w-[60%] flex flex-wrap justify-center flex-col m-2 gap-y-7">
                {reviews.map((review) => (
                  <div
                    key={review.review_id}
                    className="text-white font-mono bg-stone-600 rounded-xl p-1 pb-0 border-black border-[1px] mb-4"
                  >
                    <div className="flex justify-between w-full">
                      <Link
                        href={`/profile/${review.user_id}`}
                        className="cursor-pointer hover:scale-[1.05] transition-transform text-2xl font-semibold mx-2"
                      >
                        {review.username}
                      </Link>
                      <div className="text-xl mx-2">
                        {"⭐️".repeat(review.rating)}
                      </div>
                    </div>
                    {review.body && (
                      <div className="text-[18px] bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px]">
                        {review.body}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center p-1">
                      {(userID === 0 || review.user_id === userID) &&
                        review.user_id !== -1 && (
                          <div>
                            <button
                              onClick={() =>
                                handleDeleteReview(review.review_id)
                              }
                              className="cursor-pointer hover:scale-[1.05] text-white transition-transform text-center bg-red-500 border-black border-[1px] pl-1 pr-1 font-bold rounded"
                            >
                              delete
                            </button>
                          </div>
                        )}
                      <div className="ml-auto text-xs mx-2 font-bold">
                        {formatDate(review.review_date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
