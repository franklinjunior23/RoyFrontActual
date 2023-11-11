import { useState } from "react";
import { useForm } from "react-hook-form";
import QuillComponent from "../../../components/ReactQuill/QuillComponent";
import { useQueryClient } from "@tanstack/react-query";

function FormCreate() {
  const queryClient = useQueryClient();
  const {Empresas:DataEmpresas} = queryClient.getQueryData(["TicketSearch"]);
  const { handleSubmit, register } = useForm();
  const [QuillContent, setQuillContent] = useState("");
  const CategoryTicket = [
    { label: "Primer Nivel", value: "Primer_Nivel" },
    { label: "Segundo Nivel", value: "Segundo_Nivel" },
    { label: "Tercer Nivel", value: "Tercer_Nivel" },
  ];
  function HandleCreateTicket(data) {
    console.log(data);
  }
  return (
    <main>
      <form onSubmit={handleSubmit(HandleCreateTicket)}>
        <main className="md:grid grid-cols-2 gap-8">
          <article className="grid grid-cols-2 gap-2">
            <InputForm
              register={register}
              name={"Titulo"}
              label={"Asunto del Problema"}
              placeholder={"Titulo del ticket ..."}
              className={"col-span-2"}
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
            options={CategoryTicket}
           
            />
            <QuillComponent WriteUser={setQuillContent} className={"h-full col-span-2"} placeholder={'Escribe la descripcion del problema'}/>
          </article>
          <article>

          <SelectForm 
            label={"Empresa"}
            name={"Empresa"}
            register={register}
            placeholder={"Seleccionar Empresa"}
            options={DataEmpresas} />

            <SelectForm 
            label={"Sucursal"}
            name={"Sucursal"}
            register={register}
            placeholder={"Seleccionar Sucursal"}
            options={DataEmpresas?.Sucursales} />
          </article>
        </main>
      </form>
    </main>
  );
}

export default FormCreate;

// Compare this snippet from src/pages/Tickets/Components/ContentInfo.jsx:
function InputForm({ register, name, label, type, placeholder, className }) {
  return (
    <section className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="dark:text-white">
        {label}
      </label>
      <input
        type={type ?? "text"}
        id={name}
        placeholder={placeholder}
        className="bg-transparent border-black dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/20 dark:border-white/60"
        {...register(name)}
      />
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
        className="bg-transparent border-black dark:text-white focus:outline-none border rounded-md px-1 indent-1 py-2 border-black/20 dark:border-white/60"
        {...register(name)}
      >
        <option selected>{placeholder}</option>
        {options?.map((item, index) => (
          <option key={index} value={item.value ?? item.nombre} className="md:text-black bg-transparent">
            {item.label ?? item.nombre}
          </option>
        ))}
      </select>
    </section>
  );
}
