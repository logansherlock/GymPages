"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isLoggedIn, username, userID, membership } = useAuth();
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  const gymPics = ["/GYM_1.jpg", "/GYM_2.jpg", "/GYM_3.jpeg", "/GYM_4.jpg"];
  const baseLinkClass =
    "cursor-pointer hover:scale-[1.05] transition-transform text-center text-white border-black border-[1px]";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gymPics.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [gymPics.length]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col items-center">
        <div
          className="mb-2 text-4xl font-bold"
          style={{ WebkitTextStroke: "1px black" }}
        >
          #1 Site for Gym Information in Nassau County
        </div>
        <div className="w-[80%] h-[550px] overflow-hidden relative border-black border-[1px]">
          <Image
            src={gymPics[currentImageIndex]}
            alt="Gym Image"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {gymPics.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                title={`Select image ${index + 1}`}
                className={`w-3 h-3 rounded-full border-[.5px] border-black  ${
                  index === currentImageIndex ? "bg-red-500 " : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row mt-10 font-bold text-xl gap-x-5">
          <Link
            href="/gyms"
            className={`${baseLinkClass} bg-stone-500 px-3 py-1 `}
          >
            Gym Search
          </Link>
          <Link
            href="/exercises"
            className={`${baseLinkClass} bg-stone-500 px-3 py-1 `}
          >
            Exercises
          </Link>
        </div>

        {isLoggedIn && userID !== 0 ? (
          <div className="flex flex-row mt-5 font-bold text-xl gap-x-5">
            <Link
              href={`/profile/${userID}`}
              className={`${baseLinkClass} bg-stone-500 px-3 py-1 `}
            >
              Profile
            </Link>
            {membership ? (
              <Link
                href={`/community-board/${membership}`}
                className={`${baseLinkClass} bg-stone-500 px-3 py-1 `}
              >
                Community Board
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : userID === 0 ? (
          <div className="flex flex-col items-center mt-5 font-bold text-xl">
            <button
              onClick={() => setShowAdminLinks(!showAdminLinks)}
              className={`${baseLinkClass} text-white px-3 py-1  text-center ${
                showAdminLinks === true ? "bg-stone-600" : "bg-stone-500"
              }`}
            >
              Admin Tools
            </button>

            {showAdminLinks && (
              <div className="flex flex-col mt-3 bg-stone-400 gap-y-3 text-sm p-2 border-black border-[1px]">
                <Link
                  href="/admin-gyms"
                  className={`${baseLinkClass} bg-stone-500 px-1 `}
                >
                  Edit Gyms
                </Link>
                <Link
                  href="/admin-users"
                  className={`${baseLinkClass} bg-stone-500 px-1 `}
                >
                  Edit Users
                </Link>
                <Link
                  href="/admin-exercises"
                  className={`${baseLinkClass} bg-stone-500 px-1 `}
                >
                  Edit Exercises
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-5 font-bold text-xl">
            <Link
              href="/auth/login"
              className={`${baseLinkClass} bg-stone-500 px-3 py-1 `}
            >
              Login Now!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
