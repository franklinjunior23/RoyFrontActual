import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "../../services/ConfigApi";
import { DataImageUser } from "../../store/UploadImages";
import { UseContextLoged } from "../../context/AuhtLoged";
import { SearchUser } from "../../store/SearchUser";
import HeadPage from "./Components/HeadPage";
import InputComponent from "./Components/InputComponent";
import ContentUpload from "./Components/ContentUpload";
import QuillComponent from "../../components/ReactQuill/QuillComponent";
import { DateTime } from "luxon";

function PageCreate() {
  const [WriteUser, setWriteUser] = useState("");
  const { BaseConocimiento, DeleteBaseCon, DeleteImageScreen } =
    DataImageUser();
  const { register, handleSubmit } = useForm();
  const peruTime = DateTime.now().setZone("America/Lima");
  const formattedDateTime = peruTime.toFormat("yyyy-MM-dd");
  const { mutate, isLoading } = useMutation({
    mutationFn: (dats) => {
      const formData = new FormData();
      formData.append("Titulo", dats.Titulo);
      formData.append("Categoria", dats.Categoria);
      formData.append("Contenido", WriteUser);
      for (const file of BaseConocimiento) {
        formData.append("image", file);
      }
      const data = axiosInstance.post("BaseConocimiento", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: (datos) => {
      if (datos.data?.create) {
        navi(-1);
        DeleteBaseCon();
        DeleteImageScreen();
        return toast.success(datos.data.message);
      } else {
        return toast.error(datos.data.message);
      }
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });
  const navi = useNavigate({ replace: true });
  const {
    LogedAuth: { nombre: NameUser },
  } = UseContextLoged();
  const { BaseConocimiento: DataBaseConocimiento } = SearchUser();

  function HandleCreate(datos) {
    if (ExistTitleEquals(datos.Titulo, DataBaseConocimiento)) {
      toast.error("El titulo tiene que ser diferente a los demas articulos", {
        duration: 5000,
        action:{
          label:"Cerrar",
          onClick:()=>{
            toast.dismiss();
          }
        }
      });
      return;
    }
    mutate(datos);
    console.log(datos);
  }

  function onCancel() {
    navi(-1, { replace: true });
  }

  return (
    <>
      <HeadPage site={"Create"} />
      <form onSubmit={handleSubmit(HandleCreate)}>
        <main className="md:grid md:grid-cols-2 overflow-hidden gap-4">
          <section className="h-[650px] overflow-hidden   grid">
            <main>
              <main className="grid gap-3 mb-3">
                <div className="grid grid-cols-2 gap-5">
                  <InputComponent
                    label={"Titulo"}
                    register={register}
                    name={"Titulo"}
                  />
                  <InputComponent
                    label={"Categoria"}
                    register={register}
                    name={"Categoria"}
                  />
                </div>
              </main>
              <div className="flex gap-2 mb-5">
                <span className="bg-orange-400 text-white text-xs  text-center  px-4 rounded-md font-semibold">
                  {NameUser}
                </span>
                <span className="text-white bg-blue-300 text-xs  px-4 rounded-md font-semibold">
                  {formattedDateTime}
                </span>
              </div>
              <div className="h-[350px] lg:w-[410px] md:w-[320px] w-[320px] m-auto lg:m-0 ">
                <QuillComponent
                  WriteUser={WriteUser}
                  setWriteUser={setWriteUser}
                />
              </div>
            </main>
          </section>
          <section>
            <ContentUpload />
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                className="bg-black/80 text-white py-2 rounded-md"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creando ..." : "Crear"}
              </button>
              <button
                className="bg-gray-500 text-white rounded-md"
                type="button"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </section>
        </main>
      </form>
    </>
  );
}

export default PageCreate;

function ExistTitleEquals(titulo, data) {
  return data?.some(
    (item) => item?.Titulo.toLowerCase() === titulo.toLowerCase()
  );
}
