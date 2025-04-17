"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Gym() {
  const {isLoggedIn, username} = useAuth();

  return (
    <div>
      {isLoggedIn && username ? <div>{username}</div> : <div>no user</div>}
    </div>
  );
}
