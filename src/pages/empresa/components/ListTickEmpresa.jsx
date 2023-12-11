import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import { GetEmpresas } from "@/services/ApiGets";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PDFViewer } from "@react-pdf/renderer";
import { ItemPdfEtiqueta } from "../../../components/pdf/ItemEtiquetas";
import axiosInstance from "../../../services/ConfigApi";

function ListTickEmpresa() {
  const [modalActiveEtiqts, setModalActiveEtiqts] = useState(false);
  const [DataEtiquetas, setDataEtiquetas] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["EmpresasDataPage"],
    queryFn: GetEmpresas,
  });
  const { register, handleSubmit, watch } = useForm();
  const watchEmpresa = watch("Empresa");

  async function handleSubmitDataEtiquetas({ Empresa, Sucursal }) {
    try {
      const response = await axiosInstance.get(
        `Informes/Dispositivos/Etiquetas?empresa=${Empresa}&sucursal=${Sucursal}`
      );
      setDataEtiquetas(response?.data);
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje al usuario o registrar el error
      console.error("Error al obtener datos de etiquetas:", error);
    }
  }

  return (
    <>
      <button
        className="flex text-white bg-black px-3 gap-2 py-2 rounded-md"
        onClick={() => setModalActiveEtiqts(!modalActiveEtiqts)}
      >
        <IconPlus />
        Etiquetas Pc
      </button>

      {modalActiveEtiqts && (
        <main className="w-full h-full bg-black/20 z-50 fixed top-0 right-0 grid place-content-center">
          <article className="bg-white shadow-md dark:bg-DarkComponent p-4 rounded-lg md:w-[950px] h-[400px] md:h-[550px] overflow-hidden ">
            <h3 className="dark:text-white text-center text-xl">
              Elegir la empresa y Sucursal
            </h3>

            {isLoading ?? <h2>Cargando...</h2>}

            <main className="grid  min-h-full  md:grid-cols-[170px_1fr]  ">
              <section className="grid place-content-center">
                <form onSubmit={handleSubmit(handleSubmitDataEtiquetas)}>
                  <section className="grid grid-rows-1 gap-2  w-full">
                    <SelectInputs
                      ViewEmpresa={watchEmpresa}
                      data={data}
                      name={"Empresa"}
                      register={register}
                      label={"Empresa"}
                    />
                    {watchEmpresa && (
                      <SelectInputs
                        ViewEmpresa={watchEmpresa}
                        data={data}
                        name={"Sucursal"}
                        register={register}
                        filter={true}
                        label={"Sucursal"}
                      />
                    )}
                  </section>
                 <section className="grid gap-2 mt-4">
                 <button type="submit" className=" py-1.5 bg-black rounded-md text-white md:text-sm">Enviar</button>
                  <button
                    type="button"
                    className="cursor-pointer py-1.5 bg-red-600/50 rounded-md text-white md:text-sm"
                    onClick={() => setModalActiveEtiqts(!modalActiveEtiqts)}
                  >
                    Cancelar
                  </button>
                 </section>
                </form>
              </section>
              <section className="">
                {DataEtiquetas && (
                  <PDFViewer width="100%" className="h-full">
                    <ItemPdfEtiqueta data={DataEtiquetas} />
                  </PDFViewer>
                )}
              </section>
            </main>
          </article>
        </main>
      )}
    </>
  );
}

export default ListTickEmpresa;

const SelectInputs = ({ register, label, name, data, filter, ViewEmpresa }) => {
  if (filter === true)
    return (
      <section className="grid">
        <label htmlFor={label} className=" dark:text-white">
          {label}
        </label>
        <select
          {...register(name, {})}
          className="dark:bg-white/40 border border-black/20 px-1.5 py-1 focus:outline-none rounded-md dark:border-none"
        >
          <option value="Default" defaultChecked={true}>
            Seleccionar
          </option>
          {data?.data
            ?.filter((item) => item.id === parseInt(ViewEmpresa))
            .map((selectedItem) =>
              selectedItem?.Sucursales.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.nombre}
                </option>
              ))
            )}
        </select>
      </section>
    );
  else
    return (
      <section className="grid">
        <label htmlFor={label} className=" dark:text-white">
          {label}
        </label>
        <select
          {...register(name, {})}
          className="dark:bg-white/40 border border-black/20 px-1.5 py-1 focus:outline-none rounded-md dark:border-none"
        >
          <option value="Default" defaultChecked={true}>
            Seleccionar
          </option>
          {data?.data?.map((item, index) => (
            <option value={item.id} key={index}>
              {item.nombre}
            </option>
          ))}
        </select>
      </section>
    );
};
