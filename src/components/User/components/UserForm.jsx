import { IconMan, IconWoman } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import {
  Estado_User,
  FormUser,
  Nivel_Red,
  Tipo_Doc,
  TypeUser,
  Type_Email,
} from "../../../assets/DataDefault";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../../services/ConfigApi";
import { GetUserById, UpdateUserById } from "../../../services/ApiGets";
import { useEffect } from "react";

const ContentInput = ({ label, name, type, register, defaultValue }) => {
  return (
    <div>
      <label className=" text-sm mb-1 text-black/80">{label}</label>
      <input
        type={type == undefined ? "text" : type}
        className="w-full border rounded-md py-2 indent-2 truncate  text-sm"
        {...register(name)}
      />
    </div>
  );
};
const ContentSelect = ({ label, name, register, data, errors }) => {
  return (
    <div className="grid">
      <label className="text-sm mb-1">{label}</label>
      <select
        {...register(`${name}`, {
          validate: (value) => value !== "Def" || "Selecciona una opción",
        })}
        className="w-full border rounded-md py-2 indent-2 truncate text-sm"
      >
        <option value="Def">Seleccionar</option>
        {data?.map((value, index) => (
          <option value={value} key={index}>
            {value}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

function UserForm() {
  const { idUsuario } = useParams();
  if (idUsuario) {
    var { data: DataUser } = useQuery({
      queryKey: ["UserFind"],
      queryFn: () => GetUserById(idUsuario),
    });
  }
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (DataUser) {
      FormUser.forEach((param) => {
        setValue(param, DataUser?.resp[param]);
      });
    }
  }, [DataUser]);
  const VisGenero = watch("genero");
  const Sexos = ["Masculino", "Femenino"];
  const columns = [
    {
      id: "cell1",
      displayName: "Cell 1",
    },
    {
      id: "cell2",
      displayName: "Cell 2",
    },
  ];
  const { nombreE, sucursalN } = useParams();

  const navi = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: async (datos) => {
      const resp = await axiosInstance.post(
        `Users/${nombreE}/${sucursalN}`,
        datos
      );
      return resp.data;
    },
    onSuccess: (dat) => {
      if (dat.create) {
        navi(-1);
        return toast.success("Usuario Creado");
      }
      navi(-1);
      return toast.error("error");
    },
  });

  const { mutate: UpdateUser } = useMutation({
    mutationFn: async (data) => {
      const resp = await axiosInstance.put(`Users/${DataUser?.resp.id}`, data);
      return resp.data;
    },
    onSuccess: () => {
      navi(-1);
      return toast.success('Usuario Actualizado')
    },
  });

  const HandleSub = (data) => {
    if (!DataUser) return mutate(data);
    console.log("llego a actualizar");
    return UpdateUser(data);
  };
  return (
    <main className="mt-8">
      <h2 className="text-center text-lg pb-2 border-b">
        {idUsuario ? "Editando User" : "Creacion de Nuevo Usuario"}
      </h2>
      <section className="mt-10">
        <form onSubmit={handleSubmit(HandleSub)}>
          <h3 className="text-black/70 font-bold">Datos Personales</h3>
          <section className="grid grid-cols-2 gap-8">
            <div>
              <ContentInput
                label={"Nombre"}
                name={"nombre"}
                register={register}
              />
              <ContentInput
                label={"Apellido"}
                name={"apellido"}
                register={register}
              />
            </div>
            <div className="self-end">
              {VisGenero === "Masculino" ? (
                <IconMan
                  height={62}
                  width={60}
                  className="m-auto"
                  strokeWidth={1.2}
                />
              ) : (
                <IconWoman
                  height={62}
                  width={60}
                  className="m-auto"
                  strokeWidth={1.2}
                />
              )}

              <ContentSelect
                register={register}
                name={"genero"}
                label={"Genero"}
                data={Sexos}
                errors={errors}
              />
            </div>
          </section>
          <section className=" mt-2">
            <div className="lg:grid grid-cols-2 gap-8">
              <div className="grid grid-cols-2 lg:gap-x-4 gap-y-4 gap-x-2">
                <ContentSelect
                  register={register}
                  name={"tipo_doc"}
                  label={`Tipo Doc`}
                  data={Tipo_Doc}
                  errors={errors}
                />
                <ContentInput
                  label={`${watch("tipo_doc")}`}
                  name={"doc"}
                  register={register}
                  type={"number"}
                />
                <ContentInput
                  label={`Cargo`}
                  name={"cargo"}
                  register={register}
                />
                <ContentSelect
                  label={`Tipo Usuario`}
                  name={"tipo_usuario"}
                  register={register}
                  data={TypeUser}
                  errors={errors}
                />
              </div>
              <div>
                <h3 className="text-black/70 pb-2 border-b my-5 font-bold">
                  Estado Del Usuario
                </h3>
                <ContentSelect
                  label={`Estado`}
                  name={"estado"}
                  register={register}
                  data={Estado_User}
                  errors={errors}
                />
              </div>
            </div>
          </section>
          <section></section>
          <div className="lg:grid grid-cols-2 gap-8">
            <section className="mt-2">
              <h3 className="text-black/70 pb-2 border-b my-5 font-bold">
                Red
              </h3>
              <ContentSelect
                label={`Nivel Red`}
                name={"nivel_red"}
                register={register}
                data={Nivel_Red}
                errors={errors}
              />
              <div className="grid grid-cols-2 gap-2 mt-1">
                <ContentInput
                  label={`Usuario`}
                  name={"usuario"}
                  register={register}
                />
                <ContentInput
                  label={`Contraseña`}
                  name={"contraseña"}
                  register={register}
                />
              </div>
            </section>
            <section className="mt-2">
              <h3 className="text-black/70 pb-2 border-b my-5 font-bold">
                Anydesk
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <ContentInput
                  label={`Id`}
                  name={"anydesk_id"}
                  register={register}
                />
                <ContentInput
                  label={`Contraseña`}
                  name={"anydesk_contra"}
                  register={register}
                />
              </div>
            </section>
          </div>
          <section className="mt-2">
            <h3 className="text-black/70 pb-2 border-b my-5 font-bold">
              Email
            </h3>
            <ContentSelect
              label={`Tipo Email`}
              name={"email_tip"}
              register={register}
              data={Type_Email}
              errors={errors}
            />

            <div className="grid grid-cols-2 gap-2">
              <ContentInput
                label={`Email`}
                name={"email_dirrecion"}
                register={register}
              />
              <ContentInput
                label={`Contraseña`}
                name={"email_contraseña"}
                register={register}
              />
            </div>
          </section>
          <section className="grid grid-cols-2 py-5 text-white gap-1">
            <button className="bg-black py-2" disabled={isLoading}>
              {DataUser ? "actualizando" : "crear"}
            </button>
            <button className="bg-black/70 py-2">Cancelar</button>
          </section>
        </form>
      </section>
    </main>
  );
}
export default UserForm;
