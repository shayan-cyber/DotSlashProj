import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {GrDocumentDownload} from "react-icons/gr";
import Link from "next/link";
import SearchGif from "../../public/search.gif";
import Image from "next/image";
import errorPng from "../../public/images/error.png";


export default function Helper({ toglleFun, query }) {
  const [article, setArticle] = useState("");
  const [reademore, setReademore] = useState("");
  const [errorNotify, setError] = useState("");

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/api/help_portal/", {
        query: query,
      })
      .then((res) => {
        setArticle(res.data.article);
        setReademore(res.data.link);
      })
      .catch((err) => {
          setError("error")
          console.log(errorNotify);
      });
  }, [article]);

  return (
    <>
      <div className="container">
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 z-20 px-4">
          <div className="container bg-offBlack p-5 rounded-md">
            <div className="flex justify-end">
              <button
                className="text-3xl text-white"
                onClick={() => {
                  toglleFun();
                }}
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
            

            {errorNotify?<>
            
            <div className="container flex justify-center">
              
                <Image src={errorPng}  width={200} height={200}/>
                
             
              

            </div>
            <div className="flex justify-center">
              <h1 className="text-2xl text-indigo-500 mt-5 mb-3">Ohh Snap!! Can't find One..Sorry!!</h1>
            </div>
            
            </>:
            
            ""
            
            }

            {article ? (
              <>
              <h1 className="text-2xl my-3" id="header-text">
              {" "}
              Here's a help for you :
            </h1>
              <p>{article}</p>
              </>



            ) : !errorNotify &&(
              <div className="w-full flex justify-center items-center">
                <div className="bg-white rounded-full h-[100px] w-[100px] p-5 flex justify-center items-center my-5">
                  <div>
                    <Image
                      src={SearchGif}
                      alt="search"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>
              </div>
            )}

            {reademore && (
              <Link href={reademore}>
                <a className="text-xl text-blue-600">Read more</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}