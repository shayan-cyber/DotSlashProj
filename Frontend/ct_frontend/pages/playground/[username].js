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
import { IoMdClose } from "react-icons/io";

import axios from "axios";

export default function Playground({ username }) {

    const [lang, setLang] = useState("javascript");
    const [theme, setTheme] = useState("monokai");
    const [readOnly, setReadOnly] = useState(false);
    const [editorVal, setVal] = useState("");
      const handleChange = (newVal) => {
    setVal(newVal);
  };
  return (
    <>
      <AceComplier
        mode={lang === "c" || lang === "cpp" ? "c_cpp" : lang}
        theme={theme}
        // defaultValue={defaultValue}
        readOnly={readOnly}
        height="300px"
        width="100%"
        handleChange={handleChange}
        handleSave={()=>{console.log('hh');}}
        editorVal={editorVal}
      />
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
