"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddReview = ({ gym_id }: { gym_id: string }) => {
  const { isLoggedIn, username, userID, membership } = useAuth();
  const router = useRouter();

  // initialize post data
  const [postData, setPostData] = useState({
    gym_id: "",
    user_id: "",
    body: "",
  });

  const [localMessage, setLocalMessage] = useState("");

  // add user ID and users gym to the post API body
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

  // function to handle submission of a post
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // POST() method of board API by gym_id
      const response = await fetch(`/api/community-board/board/${gym_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      console.log(postData);

      const data = await response.json();
      console.log("response received add-post.tsx", data);

      if (response.ok) {
        router.push(`/community-board/${gym_id}`);
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

  // show updates while typing on webpage
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col m-[1px] pt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center font-mono"
      >
        <div className="w-[75%] text-white font-mono bg-zinc-700 rounded-xl p-1 border-black border-[1px] m-[1px] ">
          <div className="flex justify-between w-full items-center">
            <div className="text-2xl font-semibold mx-2">{username}</div>
          </div>
          <div className="rounded-xl m-[1px]">
            <textarea
              placeholder="enter post here..."
              name="body"
              value={postData.body}
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
            Post to Community Board
          </button>
        </div>
      </form>
      <div className="w-full flex justify-center">
        {localMessage && (
          <p className="mt-4 px-4 py-2 text-center text-white rounded-md font-bold bg-orange-400">
            {localMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddReview;
