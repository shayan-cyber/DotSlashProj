import React from "react";
import { languages, themes } from "../Constants";
import dynamic from "next/dynamic";

const AceEditor = dynamic(async () => {
  const ace = await import("react-ace");
  languages.forEach((lang) => {

    if(lang === 'c' || lang === 'cpp'){
      console.log(lang);
      require(`ace-builds/src-noconflict/mode-c_cpp`);

    }else{
      require(`ace-builds/src-noconflict/mode-${lang}`);
    }


    
  });
  themes.forEach((theme) => {
    require(`ace-builds/src-noconflict/theme-${theme}`);
  });
  return ace;
});

export default function CodeComplier({
  height,
  width,
  defaultValue,
  mode,
  theme,
  handleChange,
  handleSave,
  editorVal
  
}) {


 

    


  return (
    <>
      <AceEditor
        mode={mode}
        theme={theme}
        showGutter={true}
        highlightActiveLine={true}
        height={height}
        width={width}
        defaultValue={defaultValue}
        value={editorVal}
        onChange={handleChange}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
      
    </>
  );
}

