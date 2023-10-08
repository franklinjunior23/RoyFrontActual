import { useState } from "react";
import {
  IconCloudDownload,
  IconFileDescription,
  IconX,
} from "@tabler/icons-react";
import { DataImageUser } from "../../../store/UploadImages";

function ContentUpload() {
  const [dragging, setDragging] = useState(false);
  const { AddBaseConocimiento, DeleteUnic,BaseConocimiento } = DataImageUser();
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
    const files = e.dataTransfer.files;
    const newFiles = [];
    for (let i = 0; i < files.length; i++) {
      newFiles.push(files[i]);
    }
    AddBaseConocimiento(newFiles);
  };
  function Add(e) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
     
      AddBaseConocimiento(files[i]);
    }
  }

  console.log(BaseConocimiento)

  return (
    <main className="grid gap-8 lg:grid-cols-2 lg:items-center">
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
          <label
            htmlFor="file-input"
            className="dark:text-white cursor-pointer  dark:bg-black bg-DarkComponent text-white rounded-md py-2"
          >
            Selecciona un archivo
          </label>
          <input
            id="file-input"
            type="file"
            name="image"
            accept="image/gif, image/jpeg, image/png"
            multiple
            style={{ display: "none" }}
            onChange={Add}
          />
        </div>
      </section>
      <section>
        <h3 className="dark:text-white">Archivos Subidos : </h3>
        <div className="h-[250px] lg:h-[300px] py-2 pr-4  flex flex-col gap-2 overflow-y-auto CustomScroll">
          {BaseConocimiento?.length === 0 ? (
            <h3 className="dark:text-white text-center py-5">
              No hay archivos subidos
            </h3>
          ) : (
            BaseConocimiento?.map((item, index) => (
              <div
                className="flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2"
                key={index}
              >
                <div className="grid grid-cols-[40px_80%_40px] items-center gap-2 	">
                  <IconFileDescription size={40} /> <h3 className="break-normal text-ellipsis overflow-hidden w-[70%] md:w-[60%] ">{item.name ?? item.filename}</h3>
                </div>
                <IconX size={30} className="cursor-pointer" onClick={() => DeleteUnic(index)} />
              </div>
            ))
          )}
         
        </div>
      </section>
    </main>
  );
}

export default ContentUpload;
