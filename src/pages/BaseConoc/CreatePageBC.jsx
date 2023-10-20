import { useEffect, useState } from "react";
import QuillComponent from "../../components/ReactQuill/QuillComponent";
import { useForm } from "react-hook-form";
import InputComponent from "./Components/InputComponent";
import { DateTime } from "luxon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/ConfigApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IconFileDescription } from "@tabler/icons-react";
import ModalTotal from "../../components/Modal/ModalTotal";
import ContentUpload from "./Components/ContentUpload";
import { DataImageUser } from "../../store/UploadImages";


function CreatePageBC() {
  const [peruDateTime, setPeruDateTime] = useState("");
  const [ImageData, setImageData] = useState(null);
  const { BaseConocimiento, DeleteBaseCon,DeleteImageScreen } = DataImageUser();

  const navi = useNavigate();
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

  const DivInput = ({ label, name, required }) => {
    return (
      <div className="grid mb-3">
        <label className="dark:text-white">{label}</label>
        <InputComponent
          register={register}
          name={name}
          required={required}
          className={
            "focus:outline-none indent-2 py-1 bg-black/40 dark:bg-DarkComponent text-white rounded-md"
          }
        />
      </div>
    );
  };

  DivInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (dats) => {
      const formData = new FormData();
      formData.append("Titulo", dats.Titulo);
      formData.append("Categoria", dats.Categoria);
      formData.append("Contenido", WriteUser);
      for (const file of BaseConocimiento) {
        formData.append("image", file);
      }
      const data = axiosInstance.post(
        "BaseConocimiento",
        formData ,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    },

    onSuccess: (datos) => {
      if (datos.data?.create) {
        navi(-1);
        DeleteBaseCon();
        DeleteImageScreen();
        queryClient.invalidateQueries(["BaseConocimiento"]);
        return toast.success(datos.data.message);
      } else {
        return toast.error(datos.data.message);
      }
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  async function FormCreateBC(dats) {
    const formData = new FormData();
    for (let i = 0; i < BaseConocimiento.length; i++) {
      formData.append("image", BaseConocimiento[i]);
    }
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
            <div className="flex justify-between">
              <span>
                <span className="dark:text-white">{peruDateTime}</span>
                <ModalTotal
                  className={
                    "text-white bg-black px-3 py-1.5 flex gap-2 rounded-md"
                  }
                  title={` Agregar Archivo `}
                  icon={<IconFileDescription />}
                  Content={<ContentUpload />}
                  titleModal={"Agregar Archivos"}
                  data={ImageData}
                  SetData={setImageData}
                />
              </span>
            </div>
            <div className="flex justify-end items-end">
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
