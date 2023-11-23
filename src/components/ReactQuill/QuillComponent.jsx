import ReactQuill from "react-quill";
import PropTypes from "prop-types";


function QuillComponent({ WriteUser, setWriteUser, className, IsReadOnly,placeholder }) {
  const modules = {
    toolbar: [
      [{ header: [2, false] }],
      ["bold", "italic", "underline"],
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
        className={`  text-black border-black h-full CustomScroll  max-w-full   ${className}`}
        placeholder={ placeholder ?? "Escribe aqui"}
        readOnly={IsReadOnly ?? false}
        scrollingContainer={"true"}
        scrollingContainerStyle={"overflow-y: scroll"}
        preserveWhitespace={true}

        theme="snow"
        modules={modules}
        value={WriteUser}
        onChange={setWriteUser}
      />
    </>
  );
}
export default QuillComponent;

QuillComponent.propTypes = {
  WriteUser: PropTypes.string,
  setWriteUser: PropTypes.func,
  className: PropTypes.string,
  IsReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
};
