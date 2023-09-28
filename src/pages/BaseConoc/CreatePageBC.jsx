import { useEffect, useState } from "react";
import QuillComponent from "../../components/ReactQuill/QuillComponent";
import { useForm } from "react-hook-form";
import InputComponent from "./Components/InputComponent";
import { DateTime } from "luxon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/ConfigApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CreatePageBC() {
  const [peruDateTime, setPeruDateTime] = useState("");
const navi = useNavigate()
  useEffect(() => {
    const fetchPeruDateTime = () => {
      const peruDateTime = DateTime.now().setZone("America/Lima");
      const formattedDate = peruDateTime.toLocaleString(DateTime.DATETIME_FULL);
      setPeruDateTime(formattedDate);
    };

    fetchPeruDateTime();
  }, []);

  const [WriteUser, setWriteUser] = useState("");
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  // eslint-disable-next-line react/prop-types
  const DivInput = ({ label, name, required }) => {
    return (
      <div className="grid mb-3">
        <label className="dark:text-white">{label}</label>
        <InputComponent
          register={register}
          name={name}
          required={required}
          className={
            "focus:outline-none indent-2 py-1 bg-DarkComponent text-white rounded-md"
          }
        />
      </div>
    );
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: (dats) => {
      const data = axiosInstance.post("BaseConocimiento", dats);
      return data;
    },
    onSuccess: (datos) => {
     if(datos.data?.create){
        navi(-1)
        queryClient.invalidateQueries(['BaseConocimiento'])
        return toast.success(datos.data.message)
     }else{
        return toast.error(datos.data.message)
     }
    },
    onError: (error) => {
      return toast.error(error.message)
    },
  });

  async function FormCreateBC(dats) {
    mutate({ ...dats, Contenido: WriteUser });
  }
  return (
    <main>
      <section className="mb-3">
        <form onSubmit={handleSubmit(FormCreateBC)}>
          <main>
            <div className="grid grid-cols-2 gap-5">
              <DivInput label={"Titulo"} name={"Titulo"} required={true} />

              <DivInput
                label={"Categoria"}
                name={"Categoria"}
                required={true}
              />
            </div>
            <div className="flex justify-between items-end">
              <span className="dark:text-white">{peruDateTime}</span>
              <button
                type="submit"
                className="px-4 py-1 bg-black text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Creando ...." : " Crear "}
              </button>
            </div>
          </main>
        </form>
      </section>
      <section>
        <QuillComponent WriteUser={WriteUser} setWriteUser={setWriteUser} />
      </section>
    </main>
  );
}
export default CreatePageBC;
