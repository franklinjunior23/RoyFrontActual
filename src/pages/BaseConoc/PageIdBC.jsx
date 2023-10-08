import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { SearchUser } from "../../store/SearchUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import QuillComponent from "../../components/ReactQuill/QuillComponent";
import InputComponent from "./Components/InputComponent";
import SwitchTogle from "../../components/assets/SwitchTogle";
import axiosInstance from "../../services/ConfigApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PropTypes from "prop-types";

function PageIdBC() {
  const [DatsId, setDatsId] = useState([]);
  const navi = useNavigate();
  const { id } = useParams();
  const [WriteUser, setWriteUser] = useState("");

  const { register, setValue, handleSubmit, watch } = useForm();

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
              <div>
                <button
                  className="bg-black text-white py-1 px-3 rounded-md"
                  onClick={() => navi("detalle")}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          {ViewSwitch && (
            <button
              type="submit"
              className="bg-black text-white py-1 px-3 rounded-md "
            >
              Actualizar
            </button>
          )}
        </form>
      </section>
      <QuillComponent
        WriteUser={WriteUser}
        className={"mt-5"}
        setWriteUser={setWriteUser}
      />
    </div>
  );
}
export default PageIdBC;
