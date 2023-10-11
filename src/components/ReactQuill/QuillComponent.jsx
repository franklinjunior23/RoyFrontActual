import ReactQuill from "react-quill";

function QuillComponent({ WriteUser, setWriteUser ,className,IsReadOnly}) {
  const modules = {
    toolbar: [
      [{ header: [ 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],

      
    ],
  };

  return (
    <>
      <ReactQuill
        className={` dark:text-white border-black h-full CustomScroll  ${className}`}
        placeholder="Escribe tu conocimiento"
        readOnly={IsReadOnly ?? false}
        scrollingContainer={"true"}
        theme="snow"
        modules={modules}
        value={WriteUser}
        onChange={setWriteUser}
      />
    </>
  );
}
export default QuillComponent;
