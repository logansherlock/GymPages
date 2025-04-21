"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [membership, setMembership] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "same-origin",
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.user.username);
          setMembership(data.user.membership);
          setIsLoggedIn(true);
        } else {
          setUsername(null);
          setMembership(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUsername(null);
        setMembership(null);
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  return { isLoggedIn, username, membership };
}
