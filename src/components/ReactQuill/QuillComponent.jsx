import ReactQuill from "react-quill";

function QuillComponent({ WriteUser, setWriteUser ,className}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      
    ],
  };

  return (
    <>
      <ReactQuill
        className={`max-w-[650px] overflow-y-auto  rounded-md bg-white h-[400px] custom-scrollbar ${className}`}
        theme="snow"
        modules={modules}
        value={WriteUser}
        onChange={setWriteUser}
      />
    </>
  );
}
export default QuillComponent;
