import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default async function About() {
  return (
    <div className="bg-stone-500 border-[1px] text-white border-black p-3 pb-0">
      <div className="m-[1px]">
        <div
          className="text-5xl font-bold"
          style={{ WebkitTextStroke: "1px black" }}
        >
          ABOUT GYMPAGES
        </div>
        <div className="bg-stone-400/75 border-black border-[1px] text-xl font-bold mb-0 text-justify mt-2 py-2 px-4">
          GymPages is a web application designed and developed by Logan Sherlock
          and Marcos Padilla for the State University of New York at Old
          Westbury's Senior Capstone Project for the Computer and Information
          Sciences Program. GymPages is developed from scratch while utilizing
          the Next.js web development framework. This site is designed to help
          new gym-goers and experienced gym enthusiasts find information for
          gyms in Nassau County, NY, and connect with others within their gym's
          community. GymPages lets users easily see multiple gyms in their area
          while also providing users with reviews, amenities, and a community
          board where they can speak to others who are members of the same gym.
          Users can also view a database of common exercises, along with a text
          description and a YouTube video tutorial embedded on the same page.
        </div>
        <div className="flex flex-row items-center justify-center font-bold text-xl gap-2 m-[1px] my-2">
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
  );
}
