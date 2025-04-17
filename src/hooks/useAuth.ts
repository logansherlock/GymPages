"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

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
          setIsLoggedIn(true);
        } else {
          setUsername(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUsername(null);
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  return { isLoggedIn, username };
}
