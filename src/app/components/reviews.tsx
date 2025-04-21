import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";

const Reviews = ({ gym_id }: { gym_id: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
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

    fetch(`/api/reviews/${gym_id}`)
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

  return (
    <div>
      {loading ? (
        <div className="text-white">Loading Reviews...</div>
      ) : (
        <div>
          {reviews.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20">
              <div className="w-full max-w-s m-4 text-center text-5xl font-bold">
                No reviews found...
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center m-2">
              <div className="w-[60%] flex flex-wrap flex-col m-2 justify-between gap-y-10">
                {reviews.map((review) => (
                  <div key={review.review_id}>
                    <div className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px] mb-4">
                      <div className="flex justify-between w-full">
                        <div className="text-lg font-semibold">
                          {review.username}
                        </div>
                        <div className="text-sm">
                          {formatDate(review.review_date)}
                        </div>
                      </div>
                      <div className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl">
                        {review.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
