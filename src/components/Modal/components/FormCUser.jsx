import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";

import { toast } from "sonner";


// eslint-disable-next-line react/prop-types
function FormCUser({ handle }) {
  const { nombreE, sucursalN } = useParams();
  const { register, handleSubmit } = useForm();

  const CreateFunct = async (datos) => {
    const resp = await axiosInstance.post(
      `Users/${nombreE}/${sucursalN}`,
      datos
    );
    return resp.data;
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: CreateFunct,
    onSuccess: async (data) => {
      if (data.create) {
        toast.success("Usuario Creado Exitosamente");
        handle();
        return queryClient.invalidateQueries("UsersSucur");
      } else {
        return toast.error("No se pudo crear el usuario");
      }
    },
    onError: () => {
      toast.error("ha sucedido un error ");
    },
  });
  function handlSub(datos) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    mutate(datos);
  }

  return (
    <section className="w-[100%] md:w-[350px] lg:w-[600px] py-5 m-auto px-3 bg-white text-black">
      <h3 className="text-center">Crear Usuario</h3>
      <div>
        <form onSubmit={handleSubmit(handlSub)}>
          <section>
            <div className="grid">
              <label>Nombre</label>
              <input
                type="text"
                {...register("nombre")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Apellido</label>
              <input
                type="text"
                {...register("apellido")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Tipo Doc</label>
              <input
                type="text"
                {...register("tipo_doc")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Doc</label>
              <input
                type="text"
                {...register("doc")}
                className="py-1 indent-2 text-black"
              />
            </div>
          </section>
          <section>
            <div className="grid">
              <label>Cargo</label>
              <input
                type="text"
                {...register("cargo")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Tipo de Usuario</label>
              <input
                type="text"
                {...register("tipo_usuario")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Nivel de Red</label>
              <input
                type="text"
                {...register("nivel_red")}
                className="py-1 indent-2 text-black"
              />
            </div>
          </section>
          <section>
            <div className="grid">
              <label>Usuario</label>
              <input
                type="text"
                {...register("usuario")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Contraseña</label>
              <input
                type="text"
                {...register("contraseña")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Anydesk Id</label>
              <input
                type="text"
                {...register("anydesk_id")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Anydesk Contraseña</label>
              <input
                type="text"
                {...register("anydesk_contra")}
                className="py-1 indent-2 text-black"
              />
            </div>
          </section>
          <section>
          <div className="grid">
              <label>Tipo de Email</label>
              <input
                type="text"
                {...register("email_tip")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Dirrecion Email</label>
              <input
                type="text"
                {...register("email_dirrecion")}
                className="py-1 indent-2 text-black"
              />
            </div>
            <div className="grid">
              <label>Contraseña Email</label>
              <input
                type="text"
                {...register("email_contraseña")}
                className="py-1 indent-2 text-black"
              />
            </div>
          </section>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button type="submit" className=" py-2 border" disabled={isLoading}>
              {isLoading ? "Creando ..." : "Crear"}
            </button>
            <button type="button" onClick={handle} className=" py-2 border ">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default FormCUser;
