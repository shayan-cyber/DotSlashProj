import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import styles from '../styles/Home.module.css'
import Headerimg from "../public/images/Saly-10.png";
import CodeImg from "../public/images/code.png";
import ArrowRightImg from "../public/images/arrow-right.png";
import CodeEditorImg from "../public/images/code-editor.png";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';
import {BsArrowUpRightCircle} from 'react-icons/bs'

const leftVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 1.2 }
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};

const rightVariants = {
  hidden: {
    opacity: 0,
    y: '100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 1.2 }
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};


export default function Home() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const [username, setUsername] = useState("");
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies(["username"]);
  const [roomname, setRoomname] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
    if (cookieUsername["username"]) {
      setUsername(cookieUsername["username"]);

    }
  });


  return (
    <>
     

      <div className="w-full min-h-screen text-white">
        <div className="px-1 mx-auto max-w-6xl lg:-my-20 -my-10">
          <div className="flex flex-col-reverse md:flex-row lg:items-end items-center">

            {/* text */}
            <motion.div className="pt-20 pb-0 px-3 xl:px-0 md:pl-4 text-center md:pb-12 md:w-1/2 md:text-left"
              variants={leftVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1 id="header-text" className="relative z-10 text-4xl font-bold md:text-5xl font-display">
                Code, Learn and Collaborate
              </h1>
              <p className="pt-8 text-lg leading-relaxed text-white md:max-w-md md:text-xl">
                New way of collaborative programming. Share, communicate and
                learn together
              </p>
              <div className="flex my-[25px] justify-center md:justify-start">
                <Link href="/createroom">
                  <a><h1 className="text-3xl">Get Started</h1></a>
                </Link>
                
                <Link href="/createroom">
                  <button className="text-4xl mx-4 text-primary  animate-pulse">
                    <BsArrowUpRightCircle/>
                  </button>
                </Link>

              </div>
              
            </motion.div>

            {/* illustration */}
            <motion.div className="flex items-end md:w-1/2 mt-[10vh]"
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image src={Headerimg}  />
            </motion.div>

          </div>
        </div>


        <div className="flex justify-center mt-28 md:mt-52 mb-5 text-center">
          <h3 className="text-4xl md:text-5xl font-medium">What is <span className="font-semibold italic">Code Together ?</span></h3>
        </div>

        {/* cards */}
        <div className="xl:px-44 md:px-10 sm:px-28 p-10 md:pt-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* card 1 */}
          <div className="rounded overflow-hidden px-4">
            <Image src={CodeImg} />
            <div className="py-4">
              <div className="font-bold text-2xl mb-2">Collaborate Coding</div>
              <p className="text-white text-xl mt-6">
              Realtime code sharing among all the fellow programmers 
              who are present in the room. Run code, share code and download code , get indulged in this wondeful environment.
              </p>
              <div id="explore-text" className="mt-5">
              <Link href="/createroom">
                  <a className="cursor-pointer flex">
                    <span className="text-xl mr-2">Explore now</span>
                    <Image src={ArrowRightImg} />
                  </a>

                </Link>
              </div>
            </div>

          </div>
          {/* card 2 */}
          <div className="rounded overflow-hidden px-4">
            <Image src={CodeImg} />
            <div className="py-4">
              <div className="font-bold text-2xl mb-2">Seamless Communication</div>
              <p className="text-white text-xl mt-6">
              Realtime voice call, chat to appreciate seamless communication among the fellow programmers.
              Smooth voice call to communicate , discuss codes through chat.
              </p>
              <div id="explore-text" className="mt-5">
                <Link href="/createroom">
                  <a className="cursor-pointer flex">
                    <span className="text-xl mr-2">Explore now</span>
                    <Image src={ArrowRightImg} />
                  </a>

                </Link>
              </div>
            </div>

          </div>

          {/* card 3 */}
          <div className="rounded overflow-hidden px-4">
            <Image src={CodeImg} />
            <div className="py-4">
              <div className="font-bold text-2xl mb-2">Code assist 	&#38; Draft</div>
              <p className="text-white text-xl mt-6">
                Get help from our optimized search engine to find coding articles for you.
              Discuss and plan the algorithmic approaches with others , do rough work through realtime whiteboard.
              </p>
              <div id="explore-text" className="mt-5">
              <Link href="/createroom">
                  <a className="cursor-pointer flex">
                    <span className="text-xl mr-2">Explore now</span>
                    <Image src={ArrowRightImg} />
                  </a>

                </Link>
              </div>
            </div>

          </div>



        </div>

        {/* editor image */}
        <div className="mb-2 flex justify-center">
          <Image src={CodeEditorImg} priority="true" />
        </div>

     

        {/* footer */}
        <div className="pb-8 flex justify-center">
          <span className="text-3xl">@ 2022 GrowerLabs</span>
        </div>
      </div>

    </>
  );
}
