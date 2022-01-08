import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoMdRocket } from "react-icons/io";

export default function CreateRoom() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const [username, setUsername] = useState("");
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
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
      <div className="container flex items-center justify-center mt-[10vh] w-full">
        <div className="w-full">
          <div className="container flex justify-center">
            <div>
              <Link href="#join">
                <button className="p-4 mt-4 shadow-lg  animate-bounce shadow-fuchsia-600/50 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full text-6xl">
                  <IoMdRocket />
                </button>
              </Link>
            </div>
          </div>

          <div
            id="join"
            className="flex w-full justify-center mt-5 px-6 md:px-0"
          >
            <div className="container md:w-1/2">
              <Link href={auth_token ? `playground/${username}` : "/login"}>
                <button className="bg-primary text-white hover:scale-[100.5%] hover:bg-offPrimary ease-in-out duration-100 rounded-xl px-3 py-2.5 font-semibold w-full mt-5">
                  Create Room
                </button>
              </Link>

              <div className="flex justify-center">
                <input
                  className="bg-offBlack rounded-lg px-3 py-2 mt-5 mr-1 md:mr-3 w-4/5"
                  placeholder="Room Name"
                  type="text"
                  value={roomname}
                  onChange={(e) => setRoomname(e.target.value)}
                />
                <button
                  className="bg-primary text-white hover:scale-[100.7%] hover:bg-offPrimary rounded-lg px-3 py-2 ease-in-out duration-100 font-semibold w-1/5 mt-5"
                  onClick={() => {
                    if (roomname) {
                      router.push(`/playground/${roomname}`);
                    }
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}