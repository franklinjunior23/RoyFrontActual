import { useState } from "react";
import { IconCloudDownload } from "@tabler/icons-react";
import { DataImageUser } from "../../../store/UploadImages";

function ContentUpload() {
  const [dragging, setDragging] = useState(false);
  const {
    AddBaseConocimiento,
    DeleteUnic,
    BaseConocimiento,
    AddImageScreen,
    ImageScreen,
    DeleteUnicImage,
  } = DataImageUser();
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const manejarPegado = (e) => {
    // Verificar si el evento de pegado contiene datos de imagen
    if (e.clipboardData && e.clipboardData.items) {
      const nuevasImagenes = [];
      const items = e.clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          var imagenPegada = items[i].getAsFile();
          nuevasImagenes.push(URL.createObjectURL(imagenPegada));
        }
      }

      // Agregar las nuevas imágenes al estado
      AddBaseConocimiento(imagenPegada);
      AddImageScreen(nuevasImagenes);
    }
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

  return (
    <main className="grid gap-8 lg:grid lg:grid-cols-2 px-4  lg:items-center mt-8 md:mt-0">
      <section>
        <div
          className={`w-full  m-auto lg:py-4 bg-DarkComponent 
           py-3 border-dashed rounded-md  text-center text-white ${
             dragging ? "bg-gray-200" : ""
           }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onPaste={manejarPegado}
        >
          <IconCloudDownload size={70} className="text-white  mx-auto mb-2" />
          <p className="text-white  text-sm">
            Arrastra y suelta tus archivos aquí
          </p>
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
      <section className=" w-full  md:p">
        <div className="h-[250px] lg:h-[300px] py-2 pr-4 grid grid-cols-2  gap-2 overflow-y-auto CustomScroll">
          {BaseConocimiento?.length === 0 ? (
           
              <img
                src="/Images/EmptyImage.webp"
                alt=""
                className=" ml-24 object-cover "
                width={300}
                height={300}
              />
          
          ) : (
            ImageScreen?.map((item, index) => (
              <div
                className=" items-center h-[190px] bg-DarkComponent dark:text-white py-2 rounded-md px-2"
                key={index}
              >
                <div>
                  <img
                    src={item}
                    alt={`Imagen Pegada ${index}`}
                    style={{ objectFit: "cover" }}
                    className="w-full block h-[130px] "
                  />
                  <button
                    className="bg-red-500/80 text-white rounded-md px-2 py-1 mt-2 text-sm"
                    onClick={() => {
                      DeleteUnic(index);
                      DeleteUnicImage(index);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
                <div className="grid grid-cols-[40px_80%_40px] items-center gap-2 	"></div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default ContentUpload;
