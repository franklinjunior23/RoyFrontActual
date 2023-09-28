import { useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { SearchUser } from "../../store/SearchUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import QuillComponent from "../../components/ReactQuill/QuillComponent";

function PageIdBC() {
  const [DatsId, setDatsId] = useState(null);
  const { id } = useParams();
  const [WriteUser, setWriteUser] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ align: [] }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],

    ],
  };
  const Base = SearchUser((state) => state.BaseConocimiento);
  useEffect(() => {
    if (id) {
      setDatsId(Base.find((item) => item.id === id));
      setValue('Autor',DatsId?.Autor)
      setValue('Categoria',DatsId?.Categoria)
      setWriteUser(DatsId?.Contenido)
    }
  }, [Base, id,DatsId,setValue]);

  return (
    <div className="w-full h-full  grid ">
      <QuillComponent WriteUser={WriteUser} setWriteUser={setWriteUser} />
      <section className="">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="grid">
            <label className="dark:text-white">Categoria</label>
            <input
              type="text"
              
              placeholder="Categoria"
              {...register("Categoria", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.categoria && <p>{errors.categoria.message}</p>}
          </div>
          <div className="grid">
            <label className="dark:text-white" >Autor</label>
            <input
              type="text"

              placeholder="Autor"
              {...register("Autor", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.Autor && <p>{errors.Autor.message}</p>}
          </div>
          <button type="submit">Actualizar</button>
        </form>
      </section>
    </div>
  );
}
export default PageIdBC;
