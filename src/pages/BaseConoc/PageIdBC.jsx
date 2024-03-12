import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PropTypes from "prop-types";

import { SearchUser } from "../../store/SearchUser";
import QuillComponent from "../../components/ReactQuill/QuillComponent";
import InputComponent from "./Components/InputComponent";
import SwitchTogle from "../../components/assets/SwitchTogle";
import HeadPage from "./Components/HeadPage";
import { Item } from "./Components/ListContent";
import axiosInstance, { UrlDomain } from "@/helpers/config/axios-instance";



function PageIdBC() {

  // estate where the data of each knowledge base will be stored
  const [DatsId, setDatsId] = useState([]);

  // navegacion para poder iterar con la url
  const navi = useNavigate();
  // navigation to be able to iterate with the url

  const { id } = useParams();
  // save reactquill state
  const [WriteUser, setWriteUser] = useState("");

  // react query function to be able to use the state of the knowledge base data
  const { register, setValue, handleSubmit, watch } = useForm();

  const {BaseConocimiento} = SearchUser()

  // components to be able to display inputs with styles
  function DivContentInput({ label, name, isRequired }) {
    return (
      <div className="grid">
        <label className="dark:text-white">{label}</label>
        <InputComponent
          name={name}
          register={register}
          required={isRequired}
          className={
            "focus:outline-none indent-2 py-1 bg-black/40 dark:bg-DarkComponent text-white rounded-md"
          }
        />
      </div>
    );
  }

  DivContentInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
  };
  const ViewSwitch = watch("UpdateDat");
  
  const Base = SearchUser((state) => state.BaseConocimiento);

  useEffect(() => {
    if (id) {
      setDatsId(Base.find((item) => item.id === id));
      setValue("Autor", DatsId?.Autor);
      setValue("Categoria", DatsId?.Categoria);
      setWriteUser(DatsId?.Contenido);
    }
  }, [Base, id, DatsId, setValue]);
  const ClientQuery = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.put(
        `BaseConocimiento/${DatsId?.id}`,
        datos
      );
      return data;
    },
    onSuccess: (data) => {
      ClientQuery.invalidateQueries(["BaseConocimiento"]);
      if (data?.update) return toast.success(data?.message);

      return toast.error(data?.message);
    },
    onError: (data) => {
      return toast.error(data?.message);
    },
  });
 
  if (!DatsId) return navi(-1);
  return (
    <div className="w-full h-full  ">
      <HeadPage site={"Detalle"} />
      <section className="">
        <form
          onSubmit={handleSubmit((data) => {
            mutate({ ...data, Contenido: WriteUser });
          })}
        >
          <div className="grid grid-cols-2 gap-5">
            <DivContentInput label={"Categoria"} name={"Categoria"} />
            <DivContentInput label={"Autor"} name={"Autor"} />
          </div>
          <div className="flex justify-between items-center py-3">
            <div className="flex gap-4 items-center">
              <label className="dark:text-white">Actualizar</label>
              <SwitchTogle register={register} name={"UpdateDat"} />
              
            </div>
            {ViewSwitch && (
              <button
                type="submit"
                className="bg-black text-white py-1 px-3 rounded-md "
              >
                Actualizar
              </button>
            )}
          </div>
        </form>
      </section>
      <div className="h-[500px] overflow-hidden">
        <QuillComponent
          WriteUser={WriteUser}
          className={"mt-5 "}
          setWriteUser={setWriteUser}
        />
      </div>
      <section className="mt-5">
        <h3 className="text-center dark:text-white text-xl">Archivos Adjuntos</h3>

        {DatsId.Archivos?.length === 0 || null ? (
          <h3 className="text-center dark:text-white">No hay archivos subidos</h3>
        ) : (
          <article className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
            {DatsId.Archivos?.map((item, index) => (
              <div
                key={index}
                className=" bg-DarkComponent rounded-lg  overflow-hidden  h-[160px] object-cover"
              >
                <ModalImage
                  Src={`${UrlDomain}/BdConocimiento/${item?.filename}`}
                />
              </div>
            ))}
          </article>
        )}
      </section>
      <main className="mt-5">
        <h3 className="text-center text-xl dark:text-white">Base de conocimiento</h3>
        <section className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 h-[400px] overflow-y-auto">

        {BaseConocimiento?.map((BaseConocimientoList ,index)=>(
            <Item key={index} {...BaseConocimientoList} />
          ))
        }
        </section>

      </main>
    </div>
  );
}
export default PageIdBC;

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
              className="object-cover block w-full h-full "
            />
          </section>
        </main>
      )}
    </>
  );
}
ModalImage.prototype = {
  Src: PropTypes.string.isRequired,
};