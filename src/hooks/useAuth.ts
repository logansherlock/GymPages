"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userID, setUserID] = useState<number | null>(null);
  const [membership, setMembership] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.user.username);
          setUserID(data.user.user_id);
          setMembership(data.user.membership);
          setIsLoggedIn(true);
        } else {
          setUsername(null);
          setUserID(null);
          setMembership(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUsername(null);
        setUserID(null);
        setMembership(null);
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  return { isLoggedIn, username, userID, membership };
}
