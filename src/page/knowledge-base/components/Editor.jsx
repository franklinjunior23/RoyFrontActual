import React from "react";
import EditorJS from "@editorjs/editorjs";
// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

function Editor() {
  const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
  };
  const ReactEditorJS = new EditorJS({
    holder: "Edit-js",
    tools: EDITOR_JS_TOOLS,
    defaultBlock: "paragraph",
    placeholder: "Let`s write an awesome story!",
    onChange: (data) => {
      console.log(data);
      console.log("Now I know that Editor's content changed!");
    },
    onReady: () => {
      console.log("Editor.js is ready to work!");
    },
  });
  return <div id="Edit-js" className="border max-h-[400px] overflow-y-auto"></div>;
}

export default Editor;
