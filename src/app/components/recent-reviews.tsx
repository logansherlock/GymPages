import { useEffect, useState } from "react";

const RecentReviews = ({ gym_id }: { gym_id: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const maxChars = 150;

  const truncateText = (text: string, maxChars: number) => {
    if (text.length > maxChars) {
      return text.slice(0, maxChars) + "...";
    }
    return text;
  };

  useEffect(() => {
    if (!gym_id) {
      console.log("no gym_id in recent-reviews.tsx");
      return;
    }

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
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [gym_id]);

  return (
    <div className="flex flex-col justify-start h-full">
      <div
        className="w-full text-center font-white text-4xl font-bold m-1"
        style={{ WebkitTextStroke: "1px black" }}
      >
        Recent Reviews
      </div>

      {loading ? (
        <div className="flex items-center justify-center text-white m-1">
          <div className="text-4xl font-bold m-1">Loading reviews...</div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex items-center justify-center m-2">
          <div className="flex items-center justify-between">
            No reviews found.
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-evenly flex-grow gap-y-3 p-3">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.review_id}
              className="text-white font-mono bg-zinc-700 rounded-xl p-1 border-black border-[1px] w-full"
            >
              <div className="flex justify-between w-full mb-1">
                <div className="text-xl font-semibold">{review.username}</div>
                <div className="text-xl">{"⭐️".repeat(review.rating)}</div>
              </div>
              {review.body && (
                <div className="text-[17px] bg-white text-black font-semibold p-2 rounded-xl break-words border-black border-[1px] max-h-[250px] overflow-hidden">
                  {truncateText(review.body, maxChars)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentReviews;
