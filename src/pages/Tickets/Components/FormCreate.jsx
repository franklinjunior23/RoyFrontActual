import { useState } from "react";
import { useForm } from "react-hook-form";
import QuillComponent from "../../../components/ReactQuill/QuillComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { filtrarDatos } from "../../../utils/FiltUsersDisp";
import axiosInstance from "../../../services/ConfigApi";

function FormCreate() {
  const queryClient = useQueryClient();
  const { Empresas: DataEmpresas } = queryClient.getQueryData(["TicketSearch"]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [QuillContent, setQuillContent] = useState("");

  const { mutate } = useMutation({
    mutationFn: async(datos)=>{
      const {data} = await axiosInstance.post("tickets",datos)
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("TicketSearch");
      console.log(data)
    },
  });
  const CategoryTicket = [
    { label: "Primer Nivel", value: "Primer_Nivel" },
    { label: "Segundo Nivel", value: "Segundo_Nivel" },
    { label: "Tercer Nivel", value: "Tercer_Nivel" },
  ];
  const PriorityTicket = [
    { label: "Baja", value: "Baja" },
    { label: "Media", value: "Media" },
    { label: "Alta", value: "Alta" },
  ];
  const TypeTicket = [
    { label: "Dispositivo", value: "Dispositivos" },
    { label: "Usuario", value: "Users" },
  ];

  const EmpresaGet = watch("Empresa");
  const SucursalGet = watch("Sucursal");
  const TypeService = watch("TipoD");

  function HandleCreateTicket(data) {
    mutate({ ...data, Descripcion: QuillContent })
   
  }

  return (
    <main className="overflow-y-auto md:overflow-auto h-[500px] md:h-full py-5">
      <form onSubmit={handleSubmit(HandleCreateTicket)}>
        <main className="md:grid grid-cols-2 gap-8">
          <article className="md:grid grid-cols-2 flex flex-col gap-3 md:gap-y-2 md:gap-x-4">
            <InputForm
              register={register}
              name={"Titulo"}
              label={"Asunto del Problema"}
              placeholder={"Titulo del ticket ..."}
              className={"col-span-2"}
              errors={errors}
            />
            <SelectForm
              label={"Categoria"}
              name={"Categoria"}
              register={register}
              placeholder={"Seleccionar Categoria"}
              options={CategoryTicket}
            />
            <SelectForm
              label={"Prioridad "}
              name={"Prioridad"}
              register={register}
              placeholder={"Seleccionar Prioridad"}
              options={PriorityTicket}
            />
            <QuillComponent
              WriteUser={QuillContent}
              setWriteUser={setQuillContent}
              className={"md:h-[200px] col-span-2 mt-5 h-[300px] pb-10"}
              placeholder={"Escribe la descripcion del problema"}
            />
          </article>
          <article className="mt-8 md:mt-0 grid grid-cols-2 gap-4 grid-rows-4">
            <SelectForm
              label={"Empresa"}
              name={"Empresa"}
              register={register}
              placeholder={"Seleccionar Empresa"}
              options={DataEmpresas}
            />
            <SelectSucursal
              label={"Sucursal"}
              placeholder={"Seleccionar Sucursal"}
              name={"Sucursal"}
              register={register}
              options={DataEmpresas}
              watchEs={EmpresaGet}
            />
            <SelectForm
              label={"Tipo"}
              name={"TipoD"}
              register={register}
              placeholder={"Seleccione"}
              options={TypeTicket}
            />
            {TypeService && (
              <GetDispositivoSelect
                label={"Dispositivo"}
                placeholder={"Seleccionar Dispositivo"}
                name={"IdItemTick"}
                register={register}
                options={DataEmpresas}
                watchEs={EmpresaGet}
                EmpresaGet={EmpresaGet}
                SucursalGet={SucursalGet}
                TypeService={TypeService}
                DataEmpresas={DataEmpresas}
              />
            )}
            <footer>
              <button type="submit">Comprobar</button>
            </footer>
          </article>
        </main>
      </form>
    </main>
  );
}

export default FormCreate;

// Compare this snippet from src/pages/Tickets/Components/ContentInfo.jsx:
function InputForm({
  register,
  name,
  label,
  type,
  placeholder,
  className,
  errors,
}) {
  return (
    <section className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="dark:text-white">
        {label}
      </label>
      <input
        type={type ?? "text"}
        id={name}
        placeholder={placeholder}
        className="bg-transparent text-sm border-black dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/20 dark:border-white/60"
        {...register(`${name}`, {
          required: {
            value: true,
            message: "Campo requerido",
          },
        })}
      />
      {errors && errors[name] && (
        <span className="text-red-400 text-xs">
          {errors[name].message ?? "Error desconocido"}
        </span>
      )}
    </section>
  );
}

function SelectForm({
  register,
  name,
  label,
  placeholder,
  className,
  options,
}) {
  return (
    <section className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="dark:text-white">
        {label}
      </label>
      <select
        id={name}
        placeholder={placeholder}
        className="bg-transparent text-sm border-black dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/20 dark:border-white/60"
        {...register(name)}
      >
        <option selected>{placeholder}</option>
        {options?.map((item, index) => (
          <option
            key={index}
            value={item.value ?? item.nombre}
            className="md:text-black bg-transparen text-blackt"
          >
            {item.label ?? item.nombre}
          </option>
        ))}
      </select>
    </section>
  );
}

function SelectSucursal({
  register,
  name,
  label,
  placeholder,
  className,
  options,
  watchEs,
}) {
  return (
    <section className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="dark:text-white">
        {label}
      </label>
      <select
        id={name}
        placeholder={placeholder}
        className="bg-transparent border-black text-sm dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/20 dark:border-white/60"
        {...register(name)}
      >
        <option selected>{placeholder}</option>
        {options
          ?.find((empresa) => empresa.nombre === watchEs)
          ?.Sucursales.map((sucursal) => (
            <option
              key={sucursal.id}
              value={sucursal.nombre}
              className="md:text-black bg-transparent"
            >
              {sucursal.nombre}
            </option>
          )) ?? (
          <option key={1111}>
            {options?.find((empresa) => empresa.nombre === watchEs)?.Sucursales
              .length === 0
              ? "No Tiene Sucursales Creadas"
              : "Selecciona una Empresa"}
          </option>
        )}
      </select>
    </section>
  );
}

function GetDispositivoSelect({
  register,
  name,
  label,
  placeholder,
  className,
  options,
  watchEs,
  EmpresaGet,
  SucursalGet,
  TypeService,
  DataEmpresas,
}) {
  return (
    <section className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="dark:text-white">
        {label}
      </label>
      <select
        id={name}
        placeholder={placeholder}
        className="bg-transparent border-black text-sm dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/20 dark:border-white/60"
        {...register(name)}
      >
        <option selected>{placeholder}</option>
        {filtrarDatos(EmpresaGet, SucursalGet, TypeService, DataEmpresas)?.map(
          (item) => (
            <option
              key={item.id}
              value={item.id}
              className="md:text-black bg-transparent"
            >
              {item.nombre} {item.apellido ?? ""}
            </option>
          )
        ) ?? (
          <option key={1111}>
            {filtrarDatos(EmpresaGet, SucursalGet, TypeService, DataEmpresas)
              ?.length === 0
              ? "No Tiene Dispositivos Creadas"
              : "Selecciona una Empresa"}
          </option>
        )}
      </select>
    </section>
  );
}
