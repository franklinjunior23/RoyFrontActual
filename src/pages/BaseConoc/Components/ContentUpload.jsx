import { useState } from "react";
import {
  IconCloudDownload,
  IconFileDescription,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import { DataImageUser } from "../../../store/UploadImages";

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

  const {BaseConocimiento} = DataImageUser();
  return (
    <main className="grid gap-8 lg:grid-cols-2">
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
            multiple
            style={{ display: "none" }}
            onChange={(e) => console.log(e.target.files[0])}
          />
        </div>
      </section>
      <section>
        <h3 className="dark:text-white">Archivos Subidos : </h3>
        <div className="h-[200px] py-2 pr-4  flex flex-col gap-2 overflow-y-auto CustomScroll">
          {
            BaseConocimiento?.length=== 0 ? <h3 className="dark:text-white">No hay archivos subidos</h3> : BaseConocimiento?.map((item,index)=>(
             
                <div className="f  flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2" key={index}>
                <div className="flex items-center gap-2">
                  <IconFileDescription size={36} /> <h3>Nombre del archivo</h3>
                </div>
                <IconX />
              </div>
            ))
            
          }
          <div className="f  flex justify-between items-center bg-black/40 text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconFileDescription size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div>
          <div className="f  flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconPhoto size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div>
          <div className="f  flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconPhoto size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div>
          <div className="f  flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconPhoto size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div>
          
        </div>
      </section>
    </main>
  );
}

export default ContentUpload;
