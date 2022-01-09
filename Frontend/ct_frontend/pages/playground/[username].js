import dynamic from "next/dynamic";
import { languages, themes } from "../../components/Constants";
const AceEdit = dynamic(() => import("../../components/PlayGround/Editor"), {
  ssr: false,
});
const AceComplier = dynamic(
  () => import("../../components/PlayGround/Compiler"),
  {
    ssr: false,
  }
);

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { MdDownloading } from "react-icons/md";
import {IoMdClose} from "react-icons/io";

import axios from "axios";
import ToolBar from "../../components/PlayGround/ToolBar";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import Script from "next/script";
import Helper from "../../components/PlayGround/Helper";
import {MdOutlineHelpOutline} from "react-icons/md";

export default function PlayGround({ username }) {
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


  const [toggle, setToggle] = useState(false);
  const [msg, setMsg] = useState("");
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [writingUser, setWritingUser] = useState("");
  const [modalToggle, setModalToggle] = useState(false);

  const defaultValue = `
    console.log("hello world");
  `;
  const [editorVal, setVal] = useState("");
  const [inputEditorVal, setinputEditorVal] = useState("");
  

  // const [isConnected, setIsConnected] = useState(false)
  

  const [lang, setLang] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [readOnly, setReadOnly] = useState(false);

  const newLangs = [...languages];
  const newThemes = [...themes];

  newLangs.shift();
  newThemes.shift();

  const inputDefaultValue = `//Input`;
  const outputDefaultValue = `//Output`;

  // ws setup

  const [ws, setWs] = useState(undefined);
  const [con, setCon] = useState(false);
  useEffect(() => {
    setWs(new WebSocket("wss://codetogetherback.herokuapp.com/ws/code/"));
    setCon(true);
  }, []);

  useEffect(() => {
    if (ws) {
      console.log("toggle: ", toggle);
      // setToggle(false);
      console.log("ws trigger");
      ws.addEventListener("open", () => {
        console.log("open connection");
        setCon(true);
        ws.send(
          JSON.stringify({
            command: "join",
            groupname: username,
            user_name: cookieUsername["username"],
          })
        );
      });

      ws.onmessage = (e) => {
        console.log("message arrived");

        const data = JSON.parse(e.data);
        if (data.warning) {
          alert("Something went wrong");
        } else if (data.message) {
          console.log(data.token);
          console.log(auth_token);

          if (data.token !== auth_token && auth_token) {
            console.log("token not match");

            setToggle(true);
            setMsg(data.message);
            setWritingUser(data.username);

            console.log(data.message);
          }
        }
      };
    }
  });

  useEffect(() => {
    axios
      .get(`http://codetogetherback.herokuapp.com/api/get_playground_details/${username}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code) {
            setVal(res.data.code);
            console.log("set");
          }
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSave = () => {
    console.log("click");
    console.log(editorVal);
    if (con) {
      const message = editorVal;
      ws.send(
        JSON.stringify({
          command: "send",
          message: message,
          token: auth_token,
          groupname: username,
          user_name: cookieUsername["username"],
        })
      );
    } else {
      console.log("Not");
    }
  };

  const handleChange = (newVal) => {
    setVal(newVal);
  };

  const handleInputChange = (newVal) => {
    setinputEditorVal(newVal);
  };

  const [Id, setId] = useState("");

  const [output, setOutput] = useState(null);
  const [sts, setSts] = useState("");

  useEffect(async () => {
    console.log("sts:", sts);
    if (Id === "") {
      return;
    }

    console.log("in running id", Id);

    var resp = await axios.get(
      `http://api.paiza.io:80/runners/get_details?id=${Id}&api_key=guest`
    );

    var status = resp.data.status;

    while (status === "running") {
      status = await (
        await axios.get(
          `http://api.paiza.io:80/runners/get_details?id=${Id}&api_key=guest`
        )
      ).data.status;
      resp = await axios.get(
        `http://api.paiza.io:80/runners/get_details?id=${Id}&api_key=guest`
      );
      // setSts(status)
      console.log("in while");
    }
    if (status === "completed") {
      setSts(status);
    }

    if (sts === "completed") {
      setOutput(resp.data.stdout);
      setId("");
      setSts("");
    }
  }, [Id, sts, output]);

  const onRun = () => {
    // console.log(lang);

    axios
      .post("http://api.paiza.io:80/runners/create", {
        language: lang,
        source_code: editorVal,
        api_key: "guest",
        input: inputEditorVal,
      })

      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        console.log("run resp :", response);
        // setSts(response.data.status);
        setId(response.data.id);
      });
  };

  const [modaltoggle, setModaltoggle] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");

  const handleModalToggle = () => {
    setModaltoggle(!modaltoggle);
    console.log("modal toggle: ", modaltoggle);

  }




  const handleInvite = () => {
    axios.post('http://codetogetherback.herokuapp.com/api/invite-others/',{
      link:`https://code-together-eight.vercel.app/playground/${cookieUsername["username"]}`,
      no:phoneNo
    }).then(res=>{
      console.log(res)
      setModaltoggle(false)
    })
    .catch(err=>{
      console.log(err)
    })

  }


  const [helpertoggle, setHelpertoggle] = useState(false);
  const handleHelperToggle = () => {
    console.log("helper toggle: ", helpertoggle);
    setHelpertoggle(!helpertoggle);
    
  }

  const [query, setQuery] = useState("");


  

  return (
    <>
    <Script src="https://static.opentok.com/v2/js/opentok.min.js"></Script>

    {helpertoggle && <Helper toglleFun={handleHelperToggle} query={query}/>}
    


      {ws && AceComplier ? (
        <>
          <div className={modaltoggle?"container absolute flex justify-center items-center inset-0 bg-black bg-opacity-30 z-10 ":"container absolute  justify-center items-center inset-0 bg-black bg-opacity-30 z-10 hidden"}>
        <div id="modal" className="w-[80vw] md:w-[50vw] z-20 p-5 bg-offBlack rounded-md">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-primary mb-4">Invite</h1>
            <button className="text-4xl !text-offWhite" onClick={()=>{handleModalToggle()}}>
             <IoMdClose />
            </button>


          </div>
          <div className="form-group px-4 py-2">
            <label htmlFor="phone-no" className="block my-2 text-xl mb-4">Phone No</label>
            <input type='text' id="phone-no" className="w-full bg-offBlack rounded-[10px] p-2" value={phoneNo} onChange={(e)=>{setPhoneNo(e.target.value)}}></input>

          </div>

          <div className="px-4 mt-2 mb-4" id="send-button">
            <button className="p-2 bg-primary text-white w-full rounded-[12px]" onClick={()=>{handleInvite()}}>Send</button>
          </div>

          

        </div>
      </div>

      <ToolBar
        owner={username}
        writingUser={writingUser}
        username={username}
        onSave={handleSave}
        onRun={onRun}
        handleModalToggle={handleModalToggle}
        editorVal={editorVal}
        lang={lang}
      />

        <div className="flex justify-end my-2">
          <div className="search-bar px-3 py-2 flex items-center">
            <label className="text-2xl text-white mx-2 animate-pulse "><MdOutlineHelpOutline/></label>
            <input type="text" className="bg-offBlack rounded-[5px] p-2 w-[60vw] md:w-[30vw]" placeholder="Type Your Query.." value={query} onChange={(e)=>{
              setQuery(e.target.value)
            
              }}/>
            <button className="bg-transparent border-2 border-blue-600 p-2 text-offWhite rounded-[5px] ml-1 hover:text-white hover:shadow-sm hover:shadow-blue-500/50" onClick={()=>{
              setHelpertoggle(true)
              
              }}>Search</button>
          </div>

        </div>




      <div className="container w-full px-px md:px-4">
        <div className="flex justify-center">
          {toggle ? (
            <div>
              

              <button
                className="p-2 bg-expblue  rounded-md shadow-md my-4"
                onClick={() => {
                  setVal(msg);
                  setToggle(!toggle);
                }}
              >
                <h3 className="flex justify-center items-center text-base mx-3">
                  {" "}
                  {writingUser}
                  <MdDownloading className="text-2xl ml-2" />
                </h3>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex w-full px-2 md:px-6 justify-center container mt-1">
          <div className="w-full">
            <div className="flex justify-between bg-offBlack border border-grey">
              <select
                id="lang-select"
                className="w-1/8 bg-offBlack border border-offBlack justify-start"
                onChange={(e) => {
                  setLang(e.target.value);
                }}
              >
                <option value="javascript">Javascript</option>

                {newLangs.map((i, index) => {
                  return (
                    <option key={index} value={i.value}>
                      {i}
                    </option>
                  );
                })}
              </select>

              <select
                id="theme-select"
                className="w-1/10 bg-offBlack border border-offBlack"
                onChange={(e) => {
                  console.log(e.target.value);
                  setTheme(e.target.value);
                }}
              >
                <option value="monokai">Monokai</option>

                {newThemes.map((i, index) => {
                  return (
                    <option key={index} value={i.value}>
                      {i}
                    </option>
                  );
                })}
              </select>
            </div>

            <AceComplier
              mode={lang === "c" || lang === "cpp" ? "c_cpp" : lang}
              theme={theme}
              // defaultValue={defaultValue}
              readOnly={readOnly}
              height="300px"
              width="100%"
              handleChange={handleChange}
              handleSave={handleSave}
              editorVal={editorVal}
            />

            <div className="bg-offgreyer h-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-5">
              <AceEdit
                mode={"markdown"}
                theme={theme}
                defaultValue={inputDefaultValue}
                readOnly={readOnly}
                height="200px"
                width="100%"
                handleChange={handleInputChange}
                editorVal={inputEditorVal}
              />
              <AceEdit
                mode={"markdown"}
                theme={theme}
                defaultValue={outputDefaultValue}
                readOnly={readOnly}
                height="200px"
                width="100%"
                editorVal={output}
              />
            </div>
          </div>
        </div>
      </div>
        
        </>

      ):(
        <Loader/>
      )}
      
      
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