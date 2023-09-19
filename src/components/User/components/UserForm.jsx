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
      <label className=" text-sm mb-1 text-black/80 dark:text-white">{label}</label>
      <input
        type={type == undefined ? "text" : type}
        className="w-full border rounded-md py-2 indent-2 truncate  text-sm  dark:bg-DarkComponent dark:text-white dark:outline-none dark:border-none"
        {...register(name)}
      />
    </div>
  );
};
const ContentSelect = ({ label, name, register, data, errors }) => {
  return (
    <div className="grid">
      <label className="text-sm mb-1 dark:text-white">{label}</label>
      <select
        {...register(`${name}`, {
          validate: (value) => value !== "Def" || "Selecciona una opción",
        })}
        className="w-full border rounded-md py-2 indent-2 truncate text-sm dark:bg-DarkComponent dark:text-white dark:outline-none dark:border-none"
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
  const navi = useNavigate();
  const { nombreE, sucursalN, idUsuario } = useParams();
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
  }, [DataUser, setValue]);

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
      return toast.success("Usuario Actualizado");
    },
  });

  const HandleSub = (data) => {
    if (!DataUser) return mutate(data);
    return UpdateUser(data);
  };
  return (
    <main className="mt-8">
      
      <section className="mt-10">
        <form onSubmit={handleSubmit(HandleSub)}>
          <h3 className="text-black/70 font-bold dark:text-white">Datos Personales</h3>
          <section className="grid grid-cols-2 gap-2 lg:gap-8">
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
            <div className="self-end dark:text-white">
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
                <h3 className="text-black/70 pb-2 border-b my-5 font-bold dark:text-white">
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
              <h3 className="text-black/70 pb-2 border-b my-5 font-bold dark:text-white">
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
              <h3 className="text-black/70 pb-2 border-b my-5 font-bold dark:text-white">
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
          <div className="grid  lg:grid-cols-2 mt-7 gap-8">
            <section className="">
              <h3 className="text-black/70 pb-2 border-b  font-bold dark:text-white">Email</h3>
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
            <section>
              {DataUser?.resp?.Dispositivo ? (
                <>
                  <section className=" grid place-content-center py-5 px-3 border text-center dark:text-white">
                    <span >Dispositivo</span>
                    <span className="font-bold px-3 ">
                      {DataUser?.resp?.Dispositivo.tipo}
                    </span>
                    <div>
                      <span>Nombre Disp :  </span>
                      <span>{DataUser?.resp?.Dispositivo.nombre}</span>
                     
                    </div>
                  </section>
                </>
              ):(
                <h3 className="text-center dark:text-white font-semibold">No cuenta con un Dispositivo</h3>
              )}
            </section>
          </div>
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
