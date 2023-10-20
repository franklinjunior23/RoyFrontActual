import { useNavigate, useParams } from "react-router-dom";
import HeadPage from "./Components/HeadPage";
import { useQuery } from "@tanstack/react-query";
import axiosInstance, { UrlDomain } from "../../services/ConfigApi";
import QuillComponent from "../../components/ReactQuill/QuillComponent";
import InputComponent from "./Components/InputComponent";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DataImageUser } from "../../store/UploadImages";
import ModalTotal from "../../components/Modal/ModalTotal";
import { IconFileDescription } from "@tabler/icons-react";
import ContentUpload from "./Components/ContentUpload";
import SwitchTogle from "../../components/assets/SwitchTogle";

import LoadingSkeleton from "./Components/Skeleton";

export function ModalImage({ Src }) {
  const [ActiveModal, setActiveModal] = useState(false);
  function HandleModalImage() {
    setActiveModal(!ActiveModal);
  }

  
  return (
    <>
    
      <img
        src={Src}
        alt={"no se encontró la imagen"}
        className=" block w-full h-[170px] object-cover cursor-pointer"
        height={170}
        onClick={HandleModalImage}
      />
      {ActiveModal && (
        <main
          className="fixed top-0 left-0 w-screen h-screen overflow-hidden grid place-content-center bg-black/40  z-10"
          onClick={() => setActiveModal(false)}
        >
          <section className="bg-DarkComponent p-6 rounded-lg max-w-[960px] max-h-[800px]">
            <img
              src={Src}
              alt=""
              className=" object-cover block w-full h-full "
            />
          </section>
        </main>
      )}
    </>
  );
}

function PageDetalle() {
  const [WriteUser, setWriteUser] = useState("");

  const { id } = useParams();
  const navi = useNavigate();
  const { AddApi, BaseIdConocimiento, DeleteBaseUd } = DataImageUser();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["BaseConocimiento", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`BaseConocimiento/${id}`);
      return data;
    },
  });
  const { register, handleSubmit, setValue, watch } = useForm();
  const ViewSwitch = watch("UpdateCheck");
  useEffect(() => {
    if (data) {
      setWriteUser(data?.data.Contenido);
      setValue("Categoria", data?.data?.Categoria);
      if (data?.data?.Archivos?.length > 0) {
        return AddApi([...data?.data?.Archivos]);
      } else {
        DeleteBaseUd();
      }
    }
  }, [data, AddApi, setValue, DeleteBaseUd]);

  if (data?.search === false) {
    toast.error(data.message);
    return navi(-1);
  }

  if (isLoading)
    return (
      <h3 className="text-center dark:text-white text-xl">Cargando ....</h3>
    );
  if (isError)
    return (
      <h3 className="text-center dark:text-white text-xl">
        Sucedio un error, Comuniquese con su tecnico
      </h3>
    );

  const {
    data: { Autor, Titulo, ...datos },
  } = data;

  function HandleSubt(data) {
    console.log({ ...data, Contenido: WriteUser });
  }

  return (
    <>
      <HeadPage />
      <form onSubmit={handleSubmit(HandleSubt)}>
        <main className="md:grid md:grid-cols-[550px_1fr] gap-3 overflow-x-hidden">
          <section className="h-full flex flex-col justify-end ">
            <div className="">
              <header className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex flex-col">
                  <label className="dark:text-white">Categoria</label>
                  <div className="relative">
                
                    <InputComponent
                      register={register}
                      className={
                        "bg-DarkComponent py-1 px-2 indent-1 text-white focus:outline-none rounded-md"
                      }
                      name={"Categoria"}
                    />
                  </div>
                </div>
                <div className="grid">
                  <label className="dark:text-white">Autor</label>
                  <span
                    className={`bg-[#F3794E] text-center px-3 py-1 rounded-lg text-white font-bold`}
                  >
                    {Autor}
                  </span>
                </div>
              </header>
              <h3 className="dark:text-white">
                Titulo : <span className="font-bold capitalize">{Titulo}</span>
              </h3>
              <QuillComponent
                WriteUser={WriteUser}
                setWriteUser={setWriteUser}
                className={"h-[500px]"}
              />
            </div>
            {/* <div className="py-4">
              <div className="flex justify-center">
                {CountStar.map((item, index) => (
                  <Star key={index} index={index} />
                ))}
              </div>
            </div> */}
          </section>
          <section className="">
            <section>
              <h3 className="dark:text-white">Archivos</h3>
              <header className="grid grid-cols-2 h-[400px] overflow-x-hidden overflow-y-auto  custom-scrollbar gap-3  ">
                {BaseIdConocimiento.length === 0 || null ? (
                  <h3 className="text-center text-white">
                    No hay archivos subidos
                  </h3>
                ) : (
                  BaseIdConocimiento?.map((item, index) => (
                    <div
                      key={index}
                      className=" bg-DarkComponent rounded-lg  overflow-hidden  h-[160px] object-cover"
                    >
                      <ModalImage
                        Src={`${UrlDomain}/BdConocimiento/${item?.filename}`}
                      />
                    </div>
                  ))
                )}
              </header>
              <div className="mt-4">
                <ModalTotal
                  className={
                    "text-white bg-black px-3 py-1.5 flex gap-2 rounded-md"
                  }
                  title={` Agregar Archivo `}
                  icon={<IconFileDescription />}
                  Content={<ContentUpload />}
                  titleModal={"Agregar Archivos"}
                />
                <div className="flex  mt-4 justify-between items-end">
                  <div className="flex gap-4">
                    <label className="dark:text-white">Actualizar</label>
                    <SwitchTogle register={register} name={"UpdateCheck"} />
                  </div>
                  <div>
                    {ViewSwitch && (
                      <button
                        type="submit"
                        className="bg-black text-white py-1 px-3 rounded-md "
                      >
                        Actualizar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
      </form>
    </>
  );
}
export default PageDetalle;
