import Whiteboard from "../../components/PlayGround/Whiteboard"
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CanvasBoard({username}) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }else{
      router.push("/login")
    }
  },[auth_token]);
    return (
        <>
            <Whiteboard username={username}/>
        
        </>
    )



}

export async function getServerSideProps(context) {

  
  
    
    const username = context.params.username
    return {
      props: {
        username
      },
    };
  }