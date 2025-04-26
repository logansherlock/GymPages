import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-2">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/BRVDS6HVR9Q"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
