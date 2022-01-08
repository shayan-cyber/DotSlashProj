import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClear } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../Loader";

export default function Whiteboard({ username }) {
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  }, [auth_token]);

  const [ws, setWs] = useState(undefined);
  const [con, setCon] = useState(false);
  useEffect(() => {
    setWs(new WebSocket("ws://127.0.0.1:8000/ws/whiteboard/"));
    setCon(true);
  }, []);

  useEffect(() => {
    if (ws) {
      drawOnCanvas();

      ws.addEventListener("open", () => {
        console.log("open connection");

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
        } else if (data.command == "canvas-data") {
          var image = new Image();
          var canvas = document.getElementById("canvas");
          var ctx = canvas.getContext("2d");
          image.onload = function () {
            ctx.drawImage(image, 0, 0);
          };
          image.src = data.data;
        } else if (data.command == "canvas-clear") {
          var canvas = document.getElementById("canvas");
          var ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
    }
  });

  var timeout;

  function drawOnCanvas() {
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeout != undefined) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        var base64Imagedata = canvas.toDataURL("image/png");

        console.log("sending data");
        ws.send(
          JSON.stringify({
            command: "canvas-data",
            data: base64Imagedata,
            token: auth_token,
            groupname: username,
            user_name: cookieUsername["username"],
          })
        );
      }, 1000);
    };
  }

  const clearCanvas = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          command: "canvas-clear",
          token: auth_token,
          groupname: username,
          user_name: cookieUsername["username"],
        })
      );
    }
  };
  const disconnectBoard =()=>{
    ws.close()
    router.push(`/playground/${username}`)
  }
  return (
    <>
      {ws ? (
        <div className=" container mt-[2rem]  px-[2rem]">
          <div className="flex justify-between">
            <button className="bg-success text-black p-3 rounded-full text-xl mb-3" onClick={()=>{disconnectBoard()}}>
              <MdArrowBack />
            </button>

            <button
              className="bg-success text-black p-3 rounded-full text-xl mb-3"
              onClick={() => clearCanvas()}
            >
              <AiOutlineClear />
            </button>
          </div>

          <div id="sketch" className="sketch">
            <canvas id="canvas" className="bg-white w-full h-[500px]"></canvas>
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
}