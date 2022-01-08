import Link from "next/link";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "../public/images/logo_CT.svg";
import Image from "next/image";

export default function Navbar() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const router = useRouter();
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  });
  const handleLogout = () => {
    removeCookie("token");
    removeCookieUsername("username");
    setAuthToken("");
    router.push("/");
  };

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex items-center flex-wrap bg-bgBlack p-4">
        <Link href="/">
          <a className="inline-flex items-center p-2 lg:ml-8">
            <Image src={Logo} />
          </a>
        </Link>

        <button
          className="inline-flex p-3 hover:bg-gray-600 rounded md:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${
            active ? "" : "hidden"
          }   w-full md:inline-flex md:flex-grow md:w-auto`}
          onClick={handleClick}
        >
          <div className="md:inline-flex md:flex-row md:ml-16 md:mr-auto md:w-auto w-full md:justify-between md:items-center items-center flex flex-col md:h-auto md:space-x-3">
            <Link href="/">
              <a
                id="navbtn"
                className="md:inline-flex md:w-auto w-full px-6 py-2 rounded text-white ease-in-out duration-300"
              >
                Home
              </a>
            </Link>
            <Link href="/">
              <a
                id="navbtn"
                className="md:inline-flex md:w-auto w-full px-6 py-2 rounded text-white ease-in-out duration-300"
              >
                Contests
              </a>
            </Link>
          </div>

          {/*          
            <button
              id="loginbtn"
              className="md:inline-flex md:w-auto w-full px-6 items-center justify-center rounded-md py-2 ease-in-out duration-300 md:mr-10 font-semibold"
             
            >
              Log Out
            </button> */}

          {auth_token ? (
            <button
              id="loginbtn"
              className="md:inline-flex md:w-auto w-full px-6 items-center justify-center rounded-md py-2 ease-in-out duration-300 md:mr-10 font-semibold"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link href="/register">
                <button
                  id="signup"
                  className="md:inline-flex md:w-auto w-full items-center justify-center rounded px-6 py-2 ease-in-out duration-300 md:mr-4 font-semibold"
                >
                  Sign Up
                </button>
              </Link>

              <Link href="/login">
                <button
                  id="loginbtn"
                  className="md:inline-flex md:w-auto w-full items-center justify-center rounded px-6 py-2 ease-in-out duration-300 md:mr-10 font-semibold"
                >
                  Log In
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
