// import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import dynamic from "next/dynamic";



import { BiMicrophone } from "react-icons/bi";
import { HiPhoneMissedCall } from "react-icons/hi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BsHeadphones } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import { FiPhoneCall } from "react-icons/fi";
import { FiPhoneOff } from "react-icons/fi";

const OTPublisher = dynamic(
  async () => {
    const opentok = await import("opentok-react");

    const Otpub = await require("opentok-react/dist/OTPublisher.js");

    return Otpub;
  },
  { ssr: false }
);

const OTSession = dynamic(
  async () => {
    const opentok = await import("opentok-react");

    const Otpub = await require("opentok-react/dist/OTSession.js");

    return Otpub;
  },
  { ssr: false }
);

const OTStreams = dynamic(
  async () => {
    const opentok = await import("opentok-react");

    const Otpub = await require("opentok-react/dist/OTStreams.js");

    return Otpub;
  },
  { ssr: false }
);

const OTSubscriber = dynamic(
  async () => {
    const opentok = await import("opentok-react");

    const Otpub = await require("opentok-react/dist/OTSubscriber.js");

    return Otpub;
  },
  { ssr: false }
);

export default function Vonage({ username, handleToggle }) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [sessionID, setSessionID] = useState(null);
  const [apitoken, setApitoken] = useState(null);

  //  const OT = dynamic(async () => {
  //      const opentok = await import("opentok-react");

  //      return opentok;
  //  })
  var temp = [];
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/api/opentok-token/", {
        user_name: cookieUsername.username,
        groupname: "shayan",
      })
      .then((res) => {
        console.log(res.data);
        setSessionID(res.data.session_id);
        setApitoken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [subscriberIds, setSubscriberIds] = useState([]);
  const [participants, setParticipants] = useState([]);
  var temp_participants = [];

  const sessionEventHandlers = {
    streamCreated: (event) => {
      console.log(event);
      console.log(event.stream.connection.data);
      // setSubscriberIds([...subscriberIds, event.stream.streamId]);
      temp_participants.push(event.stream.connection.data);
      console.log(temp_participants);
      document.getElementById(
        "connected-users"
      ).innerHTML += `<li id="online-li" >
          <svg id="online-svg" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <span id="name">${event.stream.connection.data}</span>
    </li>`;



    //   setParticipants(temp_participants);
    //   console.log(participants);
      // this.setState({
      //   streamProperties,
      //   subscriberIds: [...this.state.subscriberIds, event.streamId],
      // });
    },
    streamDestroyed: (event) => {
      console.log("disc");
      console.log(event.stream.connection.data);
      console.log(participants);
      var temp_participants = [...participants];
      console.log(temp_participants);
      for (let i = 0; i < participants.length; i++) {
        if (participants[i] === event.stream.connection.data) {
          temp_participants.splice(i, 1);
        }
      }
      console.log(temp_participants);

      document.getElementById("connected-users").innerHTML = "";
        temp_participants.forEach((user) => {
          document.getElementById("connected-users").innerHTML += `
          <li id="online-li" >
          <svg id="online-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          <span id="name">${user}</span>
        </li>
          `;});



      

      // const indexToRemove = subscriberIds.indexOf(event.streamId);
      // const newSubscriberIds = subscriberIds;

      // if (indexToRemove !== -1) {
      // //   delete streamProperties[event.streamId];
      //   newSubscriberIds.splice(indexToRemove, 1);
      //   setSubscriberIds(newSubscriberIds);
      // //   this.setState({ subscriberIds: newSubscriberIds });
      // }
        }
    
  }

  return (
    <>
      <div className="flex justify-between  ">
        
        <button
          className="p-2 text-xl"
          onClick={() => {
            handleToggle();
          }}
        >
          <VscClose />
        </button>
      </div>
      <ul className="mb-3 mt-5 px-2" id="connected-users"></ul>

      {setSessionID && apitoken ? (
        <div className="container">
          {participants.map((i) => (
            <h1>{i}</h1>
          ))}
          <OTSession
            apiKey="47411641"
            sessionId={sessionID}
            token={apitoken}
            eventHandlers={sessionEventHandlers}
          >
            <OTPublisher
              properties={{
                height: 0,
                width: 0,
                publishVideo: false,
                audioFallbackEnabled: false,
                disableAudioProcessing: true,
                videoSource:undefined
                
              }}
            />
            <OTStreams>
              <OTSubscriber
                properties={{
                  height: 0,
                  width: 0,
                  subscribeToVideo: false,
                  publishVideo: false,
                  disableAudioProcessing: true,
                  audioFallbackEnabled: false,
                  videoSource:undefined
                
                }}
              />
            </OTStreams>
          </OTSession>
        </div>
      ) : (
        ""
      )}
    </>
  );
}