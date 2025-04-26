import MyButton from "./components/button";
import Images from "./components/images";

const listOfImages = ["/file.svg", "/globe.svg", "/vercel.svg"];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <h1 className="text-4xl font-bold justify-between p-10">Welcome to the GymPages</h1>
      <Images gymPics={listOfImages}/>
      <MyButton href="/gyms">Gym Search</MyButton>
      <MyButton href="/exercises">Exercise tutorials</MyButton>
      <MyButton href="/signup">Sign up</MyButton>
    </main>
  );
}
