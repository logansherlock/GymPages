"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Images({ gymPics }: { gymPics: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gymPics.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [gymPics.length]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative">
      <Image
        src={gymPics[currentImageIndex]}
        alt="Gym Image"
        width={400}
        height={200}
        className="rounded-lg shadow-lg"
      />
      <div className="flex justify-center mt-2 space-x-2">
        {gymPics.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            title={`Select image ${index + 1}`}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}