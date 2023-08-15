import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEmpresa } from "../../../services/ApiGets";

function FormCreate({ handle }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryCliente = useQueryClient();
  const CreateEmpress = useMutation({
    mutationFn: CreateEmpresa,
    onSuccess: () => {
      queryCliente.invalidateQueries('Empresas')
    },
  });
  function CreateEmpr(dat) {
    CreateEmpress.mutate(dat);
    handle();
  }
  const handleCerrar = () => {
    handle();
  };
  return (
    <section className="">
      <form onSubmit={handleSubmit(CreateEmpr)}>
        <h3 className="text-white text-center font-semibold text-base mt-2 mb-4 ">
          Creacion de una Empresa
        </h3>
        <div className="grid gap-2 px-3">
          <label htmlFor="Nombre" className="text-white text-sm">
            Nombre de la empresa
          </label>
          <input
            type="text"
            className="py-1.5 rounded-md bg-transparent border  text-white indent-3 focus:outline-none"
            {...register("nombre", {
              required: { value: true, message: "No puede estar vacio" },
            })}
          />
          {errors.nombre && (
            <p className="text-red-600 px-1 text-xs">{errors.nombre.message}</p>
          )}
        </div>
        <div className="grid gap-2 px-3 mt-2">
          <label htmlFor="Lugar" className="text-white text-sm ">
            Lugar de la empresa
          </label>
          <input
            type="text"
            className="py-1.5 rounded-md bg-transparent border text-white indent-3 focus:outline-none"
            {...register("lugar", {
              required: { value: true, message: "No puedo estar vacio" },
            })}
          />
          {errors.lugar && (
            <span className="text-red-600 px-1 text-xs">
              {errors.lugar.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-7 px-2">
          <button
            type="submit"
            className="border border-white rounded-lg py-2 text-white text-sm"
          >
            Confirmar
          </button>
          <button
            onClick={handleCerrar}
            type="button"
            className="border border-white rounded-lg py-2 text-white text-sm"
          >
            Cerrar
          </button>
        </div>
      </form>
    </section>
  );
}
export default FormCreate;
