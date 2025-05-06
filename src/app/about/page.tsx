import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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

        <div className="flex flex-row justify-center my-3 gap-x-3">
          <div className="flex flex-col items-center justify-center text-base font-bold bg-stone-400 px-4 py-2 border-black border-[1px]">
            <div
              className="text-4xl uppercase text-white"
              style={{ WebkitTextStroke: "1px black" }}
            >
              CREDITS
            </div>
            <div className="flex flex-col items-center gap-y-0 tracking-widest">
              <div className="mt-2">Gym Information and Reviews</div>
              <Link
                className="cursor-pointer hover:scale-[1.1] transition-transform text-xs"
                href="https://docs.developer.yelp.com/docs/fusion-intro"
              >
                Yelp Fusion API Documentation
              </Link>
            </div>
            <div className="flex flex-col items-center gap-y-0 tracking-widest">
              <div className="mt-2">Map Integration</div>
              <Link
                className="cursor-pointer hover:scale-[1.1] transition-transform text-xs"
                href="https://developers.google.com/maps/documentation/places/web-service/overview"
              >
                Google Places API Documentation
              </Link>
            </div>
            <div className="flex flex-col items-center gap-y-0 mt-1 tracking-widest">
              <div className="">Exercise Data</div>
              <Link
                className="cursor-pointer hover:scale-[1.1] transition-transform text-xs"
                href="https://github.com/yuhonas/free-exercise-db"
              >
                free-exercise-db GitHub by Yuhonas
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start font-bold text-lg gap-2 m-[1px] px-4 py-2 bg-stone-400 border-black border-[1px]">
            <div
              className="text-4xl uppercase text-white mb-3"
              style={{ WebkitTextStroke: "1px black" }}
            >
              LINKS
            </div>
            <Link
              href="https://www.linkedin.com/in/logan-sherlock-49761b293"
              className="cursor-pointer hover:scale-[1.05] transition-transform flex items-center gap-2"
              target="_blank"
            >
              Logan Sherlock
              <FaLinkedin
                className="text-blue-600 bg-white rounded"
                size={20}
              />
            </Link>

            <Link
              href="https://www.linkedin.com/in/marcospadillaacevedo/"
              className="cursor-pointer hover:scale-[1.05] transition-transform flex items-center gap-2"
              target="_blank"
            >
              Marcos Padilla
              <FaLinkedin
                className="text-blue-600 bg-white rounded"
                size={20}
              />
            </Link>
            <Link
              href="https://github.com/logansherlock/GymPages"
              className="cursor-pointer hover:scale-[1.05] transition-transform flex items-center gap-2"
              target="_blank"
            >
              GymPages GitHub
              <FaGithub
                className="text-white bg-black rounded-full"
                size={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
