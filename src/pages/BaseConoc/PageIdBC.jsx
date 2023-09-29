import { useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { SearchUser } from "../../store/SearchUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import QuillComponent from "../../components/ReactQuill/QuillComponent";
import InputComponent from "./Components/InputComponent";
import SwitchTogle from "../../components/assets/SwitchTogle";

function PageIdBC() {
  const [DatsId, setDatsId] = useState(null);
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
  const ViewSwitch = watch("UpdateDat");
  const Base = SearchUser((state) => state.BaseConocimiento);
  useEffect(() => {
    if (id) {
      setDatsId(Base.find((item) => item.id === id));
      setValue("Autor", DatsId?.Autor);
      setValue("Categoria", DatsId?.Categoria);
      setWriteUser(DatsId?.Contenido);
      setWriteUser("UpdateDat", false);
    }
  }, [Base, id, DatsId, setValue]);

  return (
    <div className="w-full h-full  grid ">
      <section className="">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="grid grid-cols-2 gap-5">
            <DivContentInput label={"Categoria"} name={"Categoria"} />
            <DivContentInput label={"Autor"} name={"Autor"} />
          </div>
          <div className="flex justify-between items-end">
            <div className="grid">
              <label className="dark:text-white">Actualizar</label>
              <SwitchTogle register={register} name={"UpdateDat"} />
            </div>
            {ViewSwitch && <button type="submit" className="bg-black text-white py-1 px-3 rounded-md ">Actualizar</button>}
          </div>
        </form>
      </section>
      <QuillComponent WriteUser={WriteUser} setWriteUser={setWriteUser} />
    </div>
  );
}
export default PageIdBC;
