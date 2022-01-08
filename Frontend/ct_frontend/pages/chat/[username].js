import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FaCode } from "react-icons/fa";
import ChatWs from "../../components/PlayGround/ChatWs";
import { useRouter } from "next/router";
export default function Chat({ username }) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [auth_token, setAuthToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }else{
      router.push("/login")
    }
  },[]);


  return (
    <>
      <ChatWs username={username}/>
    </>
  );
}

export async function getServerSideProps(context) {
  const username = context.params.username;
  return {
    props: {
      username,
    },
  };
}