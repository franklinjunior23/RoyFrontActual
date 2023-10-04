import { useState } from "react";
import { IconCloudDownload } from "@tabler/icons-react";

function ContentUpload() {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    console.log(e.dataTransfer.files[0]);
  };

  return (
    <section>
      <div
        className={`w-full lg:max-w-[450px] lg:py-8 border-black/70 border-4 dark:border-white/40 py-3 border-dashed rounded-md grid place-content-center text-center ${
          dragging ? "bg-gray-200" : "" 
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <IconCloudDownload
          size={70}
          className="dark:text-white text-black mx-auto my-2"
        />
        <p className="dark:text-white text-black ">
          Arrastra y suelta tus archivos aquí
        </p>
        <p className="dark:text-white text-black ">o</p>
        <label htmlFor="file-input" className="dark:text-white cursor-pointer  dark:bg-black bg-DarkComponent text-white rounded-md py-2">
          Selecciona un archivo
        </label>
        <input
          id="file-input"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => console.log(e.target.files[0])}
        />
      </div>
    </section>
  );
}

export default ContentUpload;