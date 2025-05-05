import { useEffect, useState } from "react";

const RecentReviews = ({ gym_id }: { gym_id: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
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

  useEffect(() => {
    if (!gym_id) return;

    fetch(`/api/rating/${gym_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.average_rating !== undefined) {
          setAverageRating(parseFloat(data.average_rating));
        } else {
          setAverageRating(null);
        }
      })
      .catch(() => setAverageRating(null));
  }, [gym_id]);

  return (
    <div className="">
      <div className="relative w-full h-9">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-center font-white text-3xl font-bold m-1"
          style={{ WebkitTextStroke: "1px black" }}
        >
          Recent Reviews
        </div>
        {averageRating !== null && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/3 text-white mr-2 font-bold text-lg">
            <span>{averageRating.toFixed(1)}</span>⭐️
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[450px] text-white m-1">
          <div className="text-4xl font-bold m-1">Loading reviews...</div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex items-center justify-center h-[450px] m-2">
          <div className="flex items-center justify-between">
            No reviews found.
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-h-[450px] overflow-y-auto w-[95%] ml-4 mr-4 p-1 mt-2 space-y-5">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.review_id}
              className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] w-full"
            >
              <div className="flex justify-between w-full mb-1">
                <div className="text-lg font-semibold">{review.username}</div>
                <div className="text-xl">{"⭐️".repeat(review.rating)}</div>
              </div>
              <div className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl break-words border-black border-[1px] max-h-[120px] overflow-hidden">
                {truncateText(review.body, maxChars)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentReviews;
