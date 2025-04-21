import { useEffect, useState } from "react";

const RecentReviews = ({ gym_id }: { gym_id: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const maxChars = 160;

  const truncateText = (text: string, maxChars: number) => {
    if (text.length > maxChars) {
      return text.slice(0, maxChars) + "...";
    }
    return text;
  };

  useEffect(() => {
    console.log("recent_reviews.tsx gym_id type: ", typeof gym_id);
    if (!gym_id) {
      console.log("no gym_id goodbye...");
      return;
    } // Prevent fetching if gym_id is undefined or empty

    fetch(`/api/recentReviews/${gym_id}`)
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
      .finally(() => setLoading(false)); // Ensure loading is set to false after fetching
  }, [gym_id]); // Only re-run this effect when gym_id changes

  return (
    <div>
      <div className="text-center font-white text-2xl font-bold">
        recent reviews
      </div>
      {loading ? (
        <div className="text-white">loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-white">no reviews yet.</div>
      ) : (

          <div className="flex flex-col h-[450px] ml-4 p-1 justify-between mt-2">
            {reviews.map((review) => (
              <div
                key={review.review_id}
                className="text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px]"
              >
                <div className="flex justify-between w-full">
                  <div className="text-lg font-semibold">{review.username}</div>
                  <div className="text-xl">{"⭐️".repeat(review.rating)}</div>
                </div>
                <div className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl">
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
