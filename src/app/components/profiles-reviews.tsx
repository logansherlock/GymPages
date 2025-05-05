import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import LoadingScreen from "./loading-screen";

const ProfileReviews = ({ user_id }: { user_id: string }) => {
  const { isLoggedIn, username, userID, membership } = useAuth();

  const [reviews, setReviews] = useState<any[]>([]);
  const [rev_loading, setRevLoading] = useState(true);

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

  return (
    <div className="m-[1px] font-mono">
          {rev_loading ? (
            <LoadingScreen text="Loading Posts" />
          ) : reviews.length ? (
            <div className="flex flex-row justify-center gap-4 m-[1px]">
              <div className="w-full max-w-5xl mx-auto flex flex-col gap-y-4">
                {" "}
                <div
                  className="flex justify-center m-[1px] text-white font-bold text-3xl"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  REVIEWS
                </div>
                {Array.isArray(reviews) &&
                  reviews.map((review) => (
                    <div key={review.review_id}>
                      <div className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] mb-4">
                        <div className="flex justify-between w-full">
                          <div className="text-xl font-semibold mx-2">REVIEW</div>
                          <div className="text-xl font-semibold mx-2">{review.gym_name}</div>
                        </div>
                        <div className="text-base bg-white text-black font-semibold p-2 rounded-xl m-[1px] border-black border-[1px] max-h-40 overflow-y-auto">
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
            </div>
          ) : (
            <></>
          )}
        </div>
  );
};

export default ProfileReviews;
