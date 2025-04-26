import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default async function About() {
  return (
    <div className="m-2 font-mono">
      <div className="m-10 bg-stone-500 border-[2px] border-black p-1 pb-0">
        <div className="m-1">
          <div
            className="text-4xl font-bold m-1"
            style={{ WebkitTextStroke: "1px black" }}
          >
            ABOUT GymPages
          </div>
          <div className="bg-stone-400/75 border-black border-[1px] text-lg font-bold m-4 mb-0 text-justify p-2">
            GymPages is a web application designed and developed by Logan
            Sherlock and Marcos Padilla for the State University of New York at
            Old Westbury's Senior Capstone Project for the Computer and
            Information Sciences Program. GymPages is developed from scratch
            while utilizing the Next.js web development framework. This site is
            designed to help new gym-goers and experienced gym enthusiasts find
            information for gyms in Nassau County, NY, and connect with others
            within their gym's community. GymPages lets users easily see
            multiple gyms in their area while also providing users with reviews,
            amenities, and a community board where they can speak to others who
            are members of the same gym. Users can also view a database of
            common exercises, along with a text description and a YouTube video
            tutorial embedded on the same page.
          </div>
          <div className="flex flex-row items-center justify-center font-bold text-xl gap-2 m-1 mb-0">
            <Link
              href="https://www.linkedin.com/in/logan-sherlock-49761b293"
              className="cursor-pointer hover:scale-[1.05] transition-transform flex items-center gap-2 mr-7"
              target="_blank"
            >
              Logan Sherlock
            </Link>
            <FaLinkedin className="text-blue-600 bg-white rounded" size={30} />
            <Link
              href="https://www.linkedin.com/in/marcospadillaacevedo/"
              className="cursor-pointer hover:scale-[1.05] transition-transform flex items-center gap-2 ml-7"
              target="_blank"
            >
              Marcos Padilla
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
