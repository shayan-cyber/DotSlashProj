import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FaCode } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiCodeCurly } from "react-icons/bi";
import Link from "next/link";

export default function ChatLayout({ messages, sendMessage, username }) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [auth_token, setAuthToken] = useState("");
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  });

  const [text, setText] = useState("");

  return (
    <>
      <div className="container h-[68vh] relative pb-4 md:pb-0">
       
        {/* username */}
        <div className="container p-4 bg-offgrey flex justify-between items-center">
          <Link href={`/playground/${username}`}>
            <a className="text-xl text-primary">
              <MdArrowBackIosNew />
            </a>
          </Link>

          <div className="flex justify-end items-center">
            <div className="rounded-full p-2 border-2 border-indigo-800">
              <BiCodeCurly />
            </div>
            <p className="mx-3 text-xl text-white">
              {cookieUsername["username"]}
            </p>
          </div>
        </div>

        {/* timeline */}
        <div
          id="chat-window"
          className="container h-full pt-8 px-4 md:px-16 overflow-y-scroll"
        >
          <div
            className="timeline max-w-full m-auto flex flex-wrap relative before:content-[''] before:absolute before:w-px before:bg-white
          before:h-full before:left-2 before:top-4"
          >
            {messages.map((message, index) => {
              if (message.user_name === cookieUsername["username"]) {
                return (
                  <div
                    key={index}
                    className="timeline-item mb-10 w-full relative pl-8 md:pl-14"
                  >
                    <div className="timeline-dot h-4 w-4 bg-white rounded-lg absolute top-3 left-0"></div>
                    <div className="timeline-content bg-offBlack p-6 rounded-lg">
                      <h3 className="text-lg mb-2 text-white">
                        {message.user_name}
                      </h3>
                      <p>{message.message}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="timeline-item mb-10 w-full relative pl-8 md:pl-14">
                    <div className="timeline-dot h-4 w-4 bg-base border-white border-2 rounded-lg absolute top-3 left-0"></div>
                    <div className="timeline-content bg-offBlack p-6 rounded-lg">
                      <h3 className="text-lg mb-2 text-white">{message.user_name}</h3>
                      <p>
                        {message.message}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* button */}
        <div className="absolute top-100 w-full px-1 mt-3">
          <div className="flex justify-center w-full">
            <input
              type="text"
              value={text}
              className="rounded-md px-2 w-full bg-offBlack"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              id="loginbtn"
              className="items-center justify-center rounded px-6 py-2 ease-in-out duration-300 
                        ml-1 font-semibold"
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}