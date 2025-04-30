import Image from "next/image"

interface MyLoadingScreenProps {
    text: string;
  }
  
  export default function LoadingScreen({ text }: MyLoadingScreenProps) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen border font-mono pb-20 m-1">
        <div className="w-full max-w-s m-4 text-center text-4xl font-bold">
         {text}
        </div>
        <Image
          src="/loadingGif.gif" // Replace with the path to your loading GIF
          alt="Loading..."
          width={250}
          height={250}
        />
      </div>
    );
  }

