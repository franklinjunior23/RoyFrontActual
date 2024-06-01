import { Button } from "@/componentUI/ui/button";
import { CloudUpload, Copy, FileText, X } from "lucide-react";

import { useRef } from "react";
import { toast } from "sonner";
import { FileMimeTypes } from "./Types/Extension";
import { Badge } from "@/componentUI/ui/badge";
import TruncateText from "@/helpers/utils/truncate-text";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
function ButtonFIles({ PastedFile, setPastedFile }) {
  const fileRef = useRef(null);
  const limit = 7;

  function Limit() {
    if (PastedFile.length > limit) {
      toast.error(`No puedes subir mas de ${limit} archivos`);
      return true;
    }
    return false;
  }

  function Upload() {
    fileRef.current.click();
  }

  function HandleOnchangeUpload() {
    if (Limit()) return;
    const files = Array.from(fileRef.current?.files || []);
    const filesWithPreview = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPastedFile((prev) => [...prev, ...filesWithPreview]);
  }
  async function HandlePaste() {
    if (Limit()) return;
    try {
      const clipboardItems = await navigator.clipboard.read();

      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type === "text/plain")
            return toast.error("No se puede pegar texto");
          const blob = await clipboardItem.getType(type);
          const newFile = new File([blob], "pasted-image.png", {
            type: blob.type,
          });
          const fileWithPreview = {
            file: newFile,
            url: URL.createObjectURL(newFile),
          };

          setPastedFile((prev) => [...prev, fileWithPreview]);
          return;
        }
      }
      toast.success("Archivo pegado con exito");
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  }
  function Delete(urlid) {
    toast.success("Archivo eliminado con exito");
    setPastedFile((prev) => prev.filter((item) => item.url !== urlid));
  }

  return (
    <div className=" rounded-lg   p-2 mb-5">
      <div>
        <Button type="button" onClick={Upload} size="sm">
          Subir Archivos
          <CloudUpload className="w-5 h-5 ml-2" />
        </Button>
        <Button type="button" onClick={HandlePaste} size="sm" className="ml-2">
          Pegar
          <Copy className="w-5 h-5 ml-2" />
        </Button>
        <input
          accept="image/*,application/pdf,.doc,.docx,.txt"
          type="file"
          onChange={HandleOnchangeUpload}
          ref={fileRef}
          className="hidden"
          multiple
          id=""
        />
        <PhotoProvider>
          <section className="flex gap-4 mt-4 flex-wrap">
            {PastedFile &&
              PastedFile.map((item, index) => (
                <ItemFile key={index} {...item} Delete={Delete} />
              ))}
          </section>
        </PhotoProvider>
      </div>
    </div>
  );
}

export default ButtonFIles;

function ItemFile({ url, Delete, file, type }) {
  if (
    (file?.type === FileMimeTypes.png) |
    FileMimeTypes.gif |
    FileMimeTypes.jpeg |
    FileMimeTypes.jpg |
    (type === "image") |
    (type === "png") |
    (type === "gif") |
    (type === "jpeg") |
    (type === "jpg")
  )
    return (
      <div className="flex gap-2 relative group border border-gray-400  rounded-md ">
        <PhotoView src={url ?? URL.createObjectURL(file)} visible={false}>
          <img
            src={url ?? URL.createObjectURL(file)}
            alt=""
            className="w-[70px] group-hover:filter- h-[70px] object-cover rounded-md"
          />
        </PhotoView>

        <Button
          size="icon"
          type="button"
          className="absolute w-6 h-6 invisible -top-3 -right-3 bg-gray-900 rounded-full group-hover:visible cursor-pointer"
          onClick={() => Delete(url)}
        >
          <X className="w-4 h-4 text-white p-0.5 " />
        </Button>
      </div>
    );

  if (
    file?.type === FileMimeTypes.pdf ||
    FileMimeTypes.doc ||
    FileMimeTypes.docx ||
    FileMimeTypes.txt
  )
    return (
      <div className="grid grid-cols-[20%_1fr] w-[170px] rounded-md p-1 border border-gray-400  gap-3 relative group h-[70px] ">
        <FileText className="w-full h-full self-center" />
        <div className="grid  justify-start">
          <span className="text-xs mt-1">
            <a href={url} target="_blank" rel="noreferrer">
              <TruncateText maxLength={13} text={file?.name ?? "Documento"} />
            </a>
          </span>

          <Badge variant="default" className="w-fit text-[10px] h-fit">
            Document
          </Badge>
        </div>
        <Button
          size="icon"
          type="button"
          className="absolute w-6 h-6 invisible -top-3 -right-3 bg-gray-900 rounded-full group-hover:visible cursor-pointer"
          onClick={() => Delete(url)}
        >
          <X className="w-4 h-4 text-white p-0.5 " />
        </Button>
      </div>
    );
}
