"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Gym() {
  const {isLoggedIn, username, userID, membership} = useAuth();

  return (
    <div>
      {isLoggedIn && username ? <div>{username}</div> : <div>no user</div>}
    </div>
  );
}
