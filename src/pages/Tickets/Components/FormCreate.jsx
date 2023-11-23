import { useState } from "react";
import { useForm } from "react-hook-form";
import QuillComponent from "../../../components/ReactQuill/QuillComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { filtrarDatos } from "../../../utils/FiltUsersDisp";
import axiosInstance from "../../../services/ConfigApi";
import { toast } from "sonner";

function FormCreate({ handleActive}) {
  
  const queryClient = useQueryClient();
  const { Empresas: DataEmpresas } = queryClient.getQueryData(["TicketSearch"]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [QuillContent, setQuillContent] = useState("");

  const { mutate,isLoading } = useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.post("tickets", datos);
      return data;
    },
    onSuccess: (data) => {
      if (!data?.create) return toast.error(data.message);
      queryClient.invalidateQueries("TicketSearch");
      toast.success(data.message);
    return handleActive();
    },
    onError: (error) => {
      return toast.error(`Sucedio un Error : ${error.message}`);
    },
  });
  const CategoryTicket = [
    { label: "Primer Nivel", value: "Primer Nivel" },
    { label: "Segundo Nivel", value: "Segundo Nivel" },
    { label: "Tercer Nivel", value: "Tercer Nivel" },
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
    mutate({ ...data, Descripcion: QuillContent });
  }

  return (
    <main className="overflow-y-auto md:overflow-auto h-[500px] md:h-full py-5">
      <form onSubmit={handleSubmit(HandleCreateTicket)}>
        <main className="md:grid grid-cols-2 gap-8 ">
          <article className=" overflow-hidden flex flex-col">
            <InputForm
              register={register}
              name={"Titulo"}
              label={"Asunto del Problema"}
              placeholder={"Titulo del ticket ..."}
              className={"col-span-2"}
              errors={errors}
            />

            <QuillComponent
              WriteUser={QuillContent}
              setWriteUser={setQuillContent}
              className={"md:h-[220px] col-span-2 mt-5 h-[300px] pb-10"}
              placeholder={"Escribe la descripcion del problema"}
            />
          </article>
          <article className="mt-8 md:mt-0 grid justify-between">
            <section className="grid grid-cols-2 gap-4 grid-rows-4">
              <SelectForm
                label={"Nivel"}
                name={"Nivel"}
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
            </section>
            <footer className="w-full grid grid-cols-2 gap-1">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-slate-400 bg-black/30 rounded-md dark:text-white dark:bg-black/70  py-2"
              >
                {isLoading ? "Creando..." : "Crear"}
                
              </button>
              <button
                type="button"
                className=" bg-black/10 rounded-md dark:text-white dark:bg-black/20 py-2"
                onClick={handleActive}
              >
                Cancelar
              </button>
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
        className="bg-transparent text-sm border-black dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/10 dark:border-white/20"
        {...register(`${name}`, {
          required: {
            value: true,
            message: "Campo requerido",
          },
        })}
      />
      {errors && errors[name] && (
        <span className="text-red-400 text-xs ">
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
        className="bg-transparent text-sm border-black dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/10 dark:border-white/20"
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
        className="bg-transparent border-black text-sm dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/10 dark:border-white/20"
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
        className="bg-transparent border-black text-sm dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/10 dark:border-white/20"
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
