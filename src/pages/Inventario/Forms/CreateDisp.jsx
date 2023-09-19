import { useForm } from "react-hook-form";
import { CategoryInventaio, FormDisp } from "../../../assets/DataDefault";
import PcLapForm from "./Components/PcLapForm";
import { DevTool } from "@hookform/devtools";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services/ConfigApi";
import RedFrom from "./Components/RedFrom";
import ImpresForm from "./Components/ImpresForm";
import { useEffect } from "react";

function CreateDisp() {
  const { nombreE, sucursalN, idDisp } = useParams();

  const { setValue, getValues, handleSubmit, register, watch, control } =
    useForm();

  const typeDisp = watch("tipo");

  const navi = useNavigate();
  const queryClien = useQueryClient();
  if (idDisp !== undefined && idDisp !== "create") {
    var { data } = useQuery({
      queryKey: ["DispById"],
      queryFn: async () => {
        const resp = await axiosInstance.get(`Dispositivos/${idDisp}`);
        return resp.data;
      },
    });
  }
  useEffect(() => {
    if (data) {
      setValue("IdUser", data?.data?.User?.id);
      setValue("FormUser", data?.data?.User !== null ? true : false);
      FormDisp.forEach((param) => {
        if ((data?.data && data?.data[param] !== null) || undefined) {
          setValue(param, data.data[param]);
          if (data?.data[param] == undefined) {
            setValue(param, data?.data?.DetalleDispositivos[0][param]);
            if (param == "Almacenamiento" || param == "Ram_Modulos") {
              setValue(
                "Almacenamiento",
                data?.data?.DetalleDispositivos[0]["Almacenamiento_detalle"]
              );
              setValue(
                "Ram_Modulos",
                data?.data?.DetalleDispositivos[0]["Ram_Modulos"]
              );
            }
          }
        }
      });
    }
  }, [data, setValue]);

  const { mutate: MutateCreate } = useMutation({
    mutationFn: async (data) => {
      const resp = await axiosInstance.post(
        `Dispositivos/${nombreE}/${sucursalN}`,
        data
      );
      return resp.data;
    },
    onSuccess: () => {
      queryClien.invalidateQueries({ queryKey: ["GetDisp"] });
      toast.success("Dispositivo creado");
      navi(-1);
    },
  });
  const { mutate: UpdateDisp } = useMutation({
    mutationFn: async (datas) => {
      const resp = await axiosInstance.put(
        `Dispositivos/${data?.data?.id}`,
        datas
      );

      return resp.data;
    },
    onSuccess: () => {
      toast.success("Dispositivo Actualizado");
      navi(-1);
      return queryClien.invalidateQueries({ queryKey: ["GetDisp"] });
    },
  });
  const HandleSubt = async (datos) => {

    if (data ==undefined) return MutateCreate(datos);
    return UpdateDisp(datos);
  };
  return (
    <main className="mt-8 pb-8">
      <form onSubmit={handleSubmit(HandleSubt)}>
       <main className="grid grid-cols-2 gap-x-8">
         <article className="grid gap-3">
           <section className="grid">
             <label className="dark:text-white">Nombre</label>
             <input
               type="text"
               {...register("nombre")}
               className="w-full py-2 dark:border-none border  outline-none dark:text-white indent-2 dark:bg-DarkComponent rounded-md"
             />
           </section>
           <section className="grid">
             <label className="dark:text-white">Tipo</label>
             <select
               {...register("tipo", { defaultValue: "Defa" })}
               className="rounded-md dark:border-none border   py-2 indent-2 px-2  dark:text-white dark:bg-DarkComponent outline-none"
             >
               <option value="Defa">Seleccionar</option>
               {CategoryInventaio.map((value) => (
                 <option value={value.name} key={value.name}>
                   {value.name}
                 </option>
               ))}
             </select>
           </section>
         </article>
         <div className="grid mt-2">
           <label className="dark:text-white">Estado {typeDisp} </label>
           <select
             {...register("estado")}
             className="dark:bg-DarkComponent border dark:border-none dark:text-white outline-none py-2 rounded-md indent-2 "
           >
             <option value="Activo">Activo</option>
             <option value="Inaperativa">Inaperativa</option>
             <option value="Malograda">Malograda</option>
           </select>
         </div>
       </main>
        {typeDisp !== "Seleccionar" && (
          <>
            {typeDisp === "Pc" ||
            typeDisp === "Laptop" ||
            typeDisp === "Servidores" ? (
              <PcLapForm
                register={register}
                watch={watch}
                getValues={getValues}
                setValue={setValue}
                control={control}
                data={data?.data}
              />
            ) : null}

            {typeDisp === "Red" ? (
              <RedFrom
                register={register}
                watch={watch}
                setValue={setValue}
                control={control}
              />
            ) : null}

            {typeDisp === "Impresora" ? (
              <ImpresForm
                register={register}
                watch={watch}
                setValue={setValue}
                control={control}
              />
            ) : null}
          </>
        )}

        <article className="grid grid-cols-2 mt-5 gap-2">
          <button
            type="submit"
            className="bg-black/90 rounded-md py-3 text-white"
          >
            {data ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            className="bg-black/40 rounded-md py-3 text-white"
            onClick={() => navi(-1)}
          >
            Cancelar
          </button>
        </article>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </main>
  );
}

export default CreateDisp;
