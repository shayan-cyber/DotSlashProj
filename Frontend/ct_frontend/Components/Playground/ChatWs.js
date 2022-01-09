import ChatLayout from "./ChatLayout";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FaCode } from "react-icons/fa";

export default function ChatWs({username}) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [auth_token, setAuthToken] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  },[auth_token]);

//   let con = false;
//   let ws = undefined;
  const [ws, setWs] = useState(undefined);
  const [con, setCon] = useState(false);
  useEffect(()=>{
      setWs(new WebSocket("ws://codetogetherback.herokuapp.com/ws/chat/"))
      setCon(true);

  },[])

  useEffect(() => {
    if(ws){

        ws.addEventListener("open", () => {
            console.log("open connection");
            con = true;
            ws.send(
              JSON.stringify({
                command: "join",
                groupname: username,
                user_name: cookieUsername["username"],
              })
            );
          });
      
          ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.warning) {
              alert("Something went wrong");
            } else if (data.message) {
              console.log(data.token);
              console.log(auth_token);
              var obj = {
                message: data.message,
                user_name: data.username,
              };
              // var temp = [... messages];
              // temp.push(obj);
              setMessages( [...messages, obj]);
              console.log(messages);
            }
          };

    }
    
  });

  const sendMessage = (text) => {
    if (con) {
      ws.send(
        JSON.stringify({
          command: "send",
          message: text,
          token: auth_token,
          groupname: username,
          user_name: cookieUsername["username"],
        })
      );
      
    } else {
      console.log("NOT CONNECTED");
    }
  };

  return <>
  
  <ChatLayout messages={messages} sendMessage={sendMessage} username={username}/>
  
  </>;
}