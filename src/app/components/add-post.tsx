"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddReview = ({ gym_id }: { gym_id: string }) => {
  const { isLoggedIn, username, userID, membership } = useAuth();
  const router = useRouter();

  const [postData, setPostData] = useState({
    gym_id: "",
    user_id: "",
    body: "",
  });

  const [localMessage, setLocalMessage] = useState("");

  useEffect(() => {
    if ((userID && membership) || userID === 0) {
      setPostData((prev) => ({
        ...prev,
        gym_id: gym_id,
        user_id: userID.toString(),
      }));
    }
  }, [gym_id, userID]);

  console.log(postData);
  console.log(isLoggedIn, username, userID);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/community-board/board/${gym_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      console.log(postData);

      const data = await response.json();
      console.log("response received add-post.tsx", data);

      if (response.ok) {
        router.push(`/community-board/${gym_id}`); // reloads the current post page
      } else {
        throw new Error(data.message || "something went wrong (add-post.tsx)");
      }
    } catch (error) {
      if (error instanceof Error) {
        setLocalMessage(error.message);
      } else {
        setLocalMessage("error occurred (add-post.tsx)");
      }
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the state
    }));
  };

  return (
    <div className="flex flex-col m-1 p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center font-mono pb-20"
      >
        <div className="w-[60%] text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px] m-1 ">
          <div className="flex justify-between w-full items-center">
            <div className="text-2xl font-semibold mx-2">{username}</div>
          </div>
          <div className="rounded-xl m-1">
            <textarea
              placeholder="enter post here..."
              name="body"
              value={postData.body}
              onChange={handleChange}
              rows={1}
              className="text-[18px] bg-white text-black font-semibold p-2 rounded-xl w-full resize-none overflow-hidden border-black border-[2px]"
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
            className="m-1 px-3 py-1 border border-slate-900 bg-orange-400 text-slate-100 font-bold rounded-md text-center"
          >
            post to community board
          </button>
        </div>
      </form>
      <div className="w-full max-w-xs">
        {localMessage && (
          <p
            className="mt-4 px-4 py-2 w-full text-center text-white rounded-md font-bold 
                      bg-green-500"
          >
            {localMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddReview;
