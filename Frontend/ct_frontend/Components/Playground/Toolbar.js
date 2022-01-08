import { useEffect, useState } from "react";
import axios from "axios";

import Image from "next/image";
import UserImg from "../../public/images/user.png";
import DotImg from "../../public/images/dot.png";

import { FiSave } from "react-icons/fi";
import { FiPlay } from "react-icons/fi";
import { useRouter } from "next/router";
import { FiHeadphones } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { BiShareAlt } from "react-icons/bi";
import {HiOutlineDocumentDownload} from "react-icons/hi";
import Link from "next/link";
import dynamic from "next/dynamic";
import { saveAs } from 'file-saver';

const Audiocall = dynamic(
  () => {
    return import("./Vonage");
  },
  { ssr: false }
);

export default function ToolBar({
  owner,
  writingUser,
  username,
  onSave,
  onRun,
  handleModalToggle,
  editorVal,
  lang
}) {
  const [memberscount, setMemberscount] = useState(0);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [tooltipshow, setTooltipshow] = useState("");
  const openTooltip = (data) => {
    setTooltipshow(data);
  };
  const closeTooltip = (data) => {
    setTooltipshow(data);
  };

  // const [filecontent, setFilecontent] = useState("");



  // var content = "What's up , hello world";
// any kind of extension (.txt,.cpp,.cs,.bat)

  console.log(lang);
  if(lang == 'javascript'){
    var filename = "CodeTogether.js";

  }else if(lang == 'python'){
    var filename = "CodeTogether.py";


  }else if(lang == 'java'){
    
    var filename = "CodeTogether.java";

  }else if(lang == 'ruby'){
      
      var filename = "CodeTogether.rb";
  

  }else if(lang == 'markdown'){
        
        var filename = "CodeTogether.md";
    
  

  }else if(lang == 'golang'){
          
     var filename = "CodeTogether.go";
      
    
  

  }else if(lang =='typescript'){

    var filename = "CodeTogether.ts";


  }else if(lang == 'csharp'){
      
      var filename = "CodeTogether.cs";
  }else if(lang == 'c'){
        
        var filename = "CodeTogether.c";
  }else if(lang == 'cpp'){
          
          var filename = "CodeTogether.cpp";

  }

 

  var blob = new Blob([editorVal], {
  type: "text/plain;charset=utf-8"
  });


  return (
    <>
      <div className="container bg-offgrey flex justify-between px-3 md:px-14 py-3 items-center text-white">
        <div className="flex items-center">
          <Image src={UserImg} width={35} height={35} />
          <span className="ml-1 md:ml-4 mr-0.5 md:mr-4 text-xs md:text-lg">
            {owner}
          </span>
          <Image src={DotImg} />
        </div>

        <div className="flex items-center relative">
          <button
            onClick={() => {
              onSave();
            }}
            className="mx-0.5 md:mx-2 cursor-pointer p-1"
            onMouseEnter={() => {
              openTooltip("save");
            }}
            onMouseLeave={() => {
              closeTooltip("");
            }}
          >
            <FiSave className="text-2xl" />
          </button>
          {tooltipshow == "save" && (
            <div className="absolute top-10 rounded-md bg-black p-1 px-2 z-10">
              save
            </div>
          )}

          <button
            onClick={() => {
              onRun();
            }}
            onMouseEnter={() => {
              openTooltip("run");
            }}
            onMouseLeave={() => {
              closeTooltip("");
            }}
            className="mx-0.5 md:mx-2 cursor-pointer p-1"
          >
            <FiPlay className="text-2xl" />
          </button>
          {tooltipshow == "run" && (
            <div className="absolute top-10 left-14 rounded-md bg-black p-1 px-2 z-10">
              run
            </div>
          )}


          <button className="mx-0.5 md:mx-2 cursor-pointer p-1 text-white" onClick={()=>{saveAs(blob, filename);}} onMouseEnter={() => {
              openTooltip("download");
            }}
            onMouseLeave={() => {
              closeTooltip("");
            }}>
            <HiOutlineDocumentDownload className="text-2xl" />
          </button>
          {tooltipshow == "download" && (
            <div className="absolute top-10 left-14 rounded-md bg-black p-1 px-2 z-10">
              Download
            </div>
          )}
        </div>

        <div className="flex items-center relative">
          <button
            className="mx-0.5 md:mx-2 cursor-pointer p-1 text-2xl"
            onMouseEnter={() => {
              openTooltip("audio");
            }}
            onMouseLeave={() => {
              closeTooltip("");
            }}
            onClick={() => {
              handleToggle();
            }}
          >
            <FiHeadphones />
          </button>
          {tooltipshow == "audio" && (
            <div className="absolute top-10  rounded-md bg-black p-1 px-2 z-10">
              audio
            </div>
          )}
          {toggle && (
            <div
              className={"absolute top-10 z-10  bg-black p-5 rounded-md"}
            >
              <Audiocall username={username} handleToggle={handleToggle} />
            </div>
          )}

          <Link href={`/canvas/${username}`}>
            <a
              className="mx-0.5 md:mx-2 cursor-pointer text-2xl p-1"
              onMouseEnter={() => {
                openTooltip("whiteboard");
              }}
              onMouseLeave={() => {
                closeTooltip("");
              }}
            >
              <FaEdit />
            </a>
          </Link>
          {tooltipshow == "whiteboard" && (
            <div className="absolute top-10 left-5  rounded-md bg-black p-1 px-2 z-10">
              whiteboard
            </div>
          )}

          <Link href={`/chat/${username}`}>
            <a
              className="mx-0.5 md:mx-2 cursor-pointer text-2xl p-1 mt-1"
              onMouseEnter={() => {
                openTooltip("chat");
              }}
              onMouseLeave={() => {
                closeTooltip("");
              }}
            >
              <MdOutlineChatBubbleOutline />
            </a>
          </Link>
          {tooltipshow == "chat" && (
            <div className="absolute top-10 left-20 rounded-md bg-black p-1 px-2 z-10">
              chat
            </div>
          )}
          <button
            onClick={() => {
              handleModalToggle();
            }}
            className="mx-0.5 md:mx-2 cursor-pointer text-2xl py-1"
            onMouseEnter={() => {
              openTooltip("share");
            }}
            onMouseLeave={() => {
              closeTooltip("");
            }}
          >
            <BiShareAlt />
          </button>
          {tooltipshow == "share" && (
            <div className="absolute top-10 right-0 rounded-md bg-black p-1 px-2 z-10">
              share
            </div>
          )}
        </div>
      </div>
    </>
  );
}