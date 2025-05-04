import { useAuth } from "@/hooks/useAuth";
import { defaultConfig } from "next/dist/server/config-shared";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddComment = ({ post_id }: { post_id: string }) => {
  const { isLoggedIn, username, userID, membership } = useAuth();
  const router = useRouter();
  console.log(
    "isLoggedIn:",
    isLoggedIn,
    ", username:",
    username,
    ", user_id:",
    userID,
    ", membership:",
    membership
  ); // Debugging log

  const [commentData, setCommentData] = useState({
    post_id: "",
    user_id: "",
    membership: "",
    body: "",
  });

  const [localMessage, setLocalMessage] = useState("");

  useEffect(() => {
    console.log("user_id:", userID, "membership:", membership); // Debugging log
    if ((userID && membership) || userID === 0) {
      setCommentData((prevData) => ({
        ...prevData,
        post_id,
        user_id: userID.toString(),
      }));
    }
  }, [post_id, userID, membership]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("submitting post (add-comment.tsx):", commentData);

    try {
      const response = await fetch(
        `/api/community-board/comments-by-post/${post_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData),
        }
      );

      const data = await response.json();
      console.log("response received add-comment.tsx", data);

      if (response.ok) {
        router.push(`/posts/${post_id}`); // reloads the current post page
      } else {
        throw new Error(
          data.message || "something went wrong (add-comment.tsx)"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setLocalMessage(error.message);
      } else {
        setLocalMessage("error occurred (add-comment.tsx)");
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the state
    }));
  };

  return (
    <div className="flex flex-col justify-center">
      <div
        className="max-w-s m-[1px] mb-4 text-center text-3xl font-bold"
        style={{ WebkitTextStroke: "1px black" }}
      >
        Add Comment
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center font-mono"
      >
        <div className="w-[50%] text-white font-mono bg-stone-600 rounded-xl p-1 border-black border-[3px] m-[1px] ">
          <div className="flex justify-between w-full">
            <div className=" font-semibold mx-1">{username}</div>
          </div>
          <div className="rounded-xl">
            <textarea
              placeholder="enter comment here..."
              name="body"
              value={commentData.body}
              onChange={handleChange}
              rows={1}
              className="text-[15px] bg-white text-black font-semibold p-2 rounded-xl w-full resize-none overflow-hidden border-black border-[2px]"
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
            Post Comment
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

export default AddComment;
