import Image from "next/image";

interface MyLoadingScreenProps {
  text: string;
}

export default function LoadingScreen({ text }: MyLoadingScreenProps) {
  return (
    <div
      className="flex flex-col justify-center items-center text-4xl font-bold min-h-screen font-mono pb-20 m-[1px]"
      style={{
        WebkitTextStroke: "1px black",
        textShadow: "1px 1px 0 black",
      }}
    >
      {text}
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/loadingGif.gif"
          alt="Loading..."
          width={250}
          height={250}
        />
      </div>
    </div>
  );
}
