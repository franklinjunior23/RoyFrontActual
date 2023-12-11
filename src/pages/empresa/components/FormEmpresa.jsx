import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateEmpresa } from "../../../services/ApiGets";
import { toast } from "sonner";
import ListTickEmpresa from "./ListTickEmpresa";

function FormEmpresa() {
  const [CreateEmpresa, setCreateEmpresa] = useState(false);

  function Close() {
    setCreateEmpresa(false);
  }
  return (
    <>
      <header className="mt-4 flex gap-2 justify-end">
        <button
          className={`flex text-white  px-3 gap-2 py-2  rounded-md text-base ${
            CreateEmpresa ? "bg-black/40" : "bg-black"
          }`}
          disabled={CreateEmpresa}
          onClick={() => setCreateEmpresa(true)}
        >
          <IconPlus />
          Crear Empresa
        </button>
       <ListTickEmpresa/>
      </header>
      <article className="mt-4">
        {CreateEmpresa && <FormCreateEmpresa FunctionClose={Close} />}
      </article>

     

    </>
  );
}

export default FormEmpresa;

const FormCreateEmpresa = ({ FunctionClose }) => {
  const { register, handleSubmit } = useForm();

  const queryCliente = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: CreateEmpresa,
    onSuccess: () => {
      queryCliente.invalidateQueries("Empresas");
      FunctionClose();
      return toast.success("Empresa creada con exito");
    },
    onError: () => {
      return toast.error("Error al crear la empresa");
    },
  });
  function HandleCreate(datos) {
    mutate(datos);
  }
  return (
    <form onSubmit={handleSubmit(HandleCreate)}>
      <main className="grid md:grid-cols-2 gap-2">
        <div className="grid">
          <label className="dark:text-white py-1">Nombre</label>
          <input
            type="text"
            className="w-full dark:bg-DarkComponent py-1 rounded-md outline-none indent-2 dark:text-white"
            {...register("nombre")}
          />
        </div>
        <div className="grid">
          <label className="dark:text-white py-1">Lugar</label>
          <input
            type="text"
            className="w-full dark:bg-DarkComponent py-1 rounded-md outline-none indent-2 dark:text-white"
            {...register("lugar")}
          />
        </div>
      </main>
      <div className="grid grid-cols-2 mt-5 md:mt-2  gap-2 ">
        <button
          className="bg-black/80 rounded-md py-1 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Creando..." : "Confirmar"}
        </button>
        <button
          className="bg-black/40 rounded-md py-1 text-white"
          onClick={FunctionClose}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
