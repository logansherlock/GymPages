"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddReview = ({ gym_id }: { gym_id: string }) => {
  const { isLoggedIn, username, userID, membership } = useAuth();

  const router = useRouter();

  const [reviewData, setReviewData] = useState({
    gym_id: "",
    user_id: "",
    body: "",
    rating: 1,
  });

  const [localMessage, setLocalMessage] = useState("");

  useEffect(() => {
    if ((isLoggedIn && userID) || userID === 0) {
      setReviewData((prevData) => ({
        ...prevData,
        gym_id,
        user_id: userID.toString(),
      }));
    }
  }, [gym_id, userID]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const reviewDataWithNumberRating = {
      ...reviewData,
      rating: Number(reviewData.rating), // Convert rating to a number
    };
    try {
      const response = await fetch(`/api/reviews/reviews-by-gym/${gym_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewDataWithNumberRating),
      });

      const data = await response.json();
      console.log("response received add-review.tsx", data);

      if (response.ok) {
        router.push(`/reviews/${gym_id}`); // reloads the current post page
      } else {
        throw new Error(
          data.message || "something went wrong (add-review.tsx)"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setLocalMessage(error.message);
      } else {
        setLocalMessage("error occurred (add-review.tsx)");
      }
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? Number(value) : value, // Convert rating to number here if needed
    }));
  };

  return (
    <div className="flex flex-col m-[1px] pt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center font-mono"
      >
        <div className="w-[75%] text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[1px] m-[1px] ">
          <div className="flex justify-between w-full items-center">
            <div className="text-2xl font-semibold mx-2">{username}</div>
            <div className="flex flex-row items-center gap-2 w-[25%]">
              <input
                type="range"
                name="rating"
                min="1"
                max="5"
                step="1"
                value={reviewData.rating}
                onChange={handleChange}
                className="w-full accent-yellow-400"
              />
              <div className="text-lg font-bold text-white whitespace-nowrap">
                ⭐️ {reviewData.rating}
              </div>
            </div>
          </div>
          <div className="rounded-xl m-[1px]">
            <textarea
              placeholder="enter review here..."
              name="body"
              value={reviewData.body}
              onChange={handleChange}
              rows={1}
              className="text-[18px] bg-white text-black font-semibold p-2 rounded-xl w-full resize-none overflow-hidden border-black border-[1px]"
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
        </div>
        <div className="w-full max-w-xs text-center">
          <button
            type="submit"
            className="m-4 px-3 py-1 border border-slate-900 bg-orange-400 text-slate-100 font-bold rounded-md text-center"
          >
            Post Review
          </button>
        </div>
      </form>
      <div className="w-full flex justify-center">
        {localMessage && (
          <p
            className="mt-4 px-4 py-2 text-center text-white rounded-md font-bold bg-orange-400"
          >
            {localMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddReview;
