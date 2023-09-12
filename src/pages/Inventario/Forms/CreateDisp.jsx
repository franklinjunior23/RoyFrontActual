import { useForm } from "react-hook-form";
import { CategoryInventaio, FormDisp } from "../../../assets/DataDefault";
import PcLapForm from "./Components/PcLapForm";
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

function ActionType({ type, register, watch, setValue, control, getValues }) {
  if (!type || type === "Defa") {
    return null;
  }

  if (type === "Pc" || type === "Laptop" || type === "Servidores")
    return (
      <PcLapForm
        register={register}
        watch={watch}
        getValues={getValues}
        setValue={setValue}
        control={control}
      />
    );

  if (type === "Red")
    return (
      <RedFrom
        register={register}
        watch={watch}
        setValue={setValue}
        control={control}
      />
    );
  if (type === "Impresora")
    return (
      <ImpresForm
        register={register}
        watch={watch}
        setValue={setValue}
        control={control}
      />
    );
}

function CreateDisp() {
  const { nombreE, sucursalN, idDisp } = useParams();

  const { setValue, getValues, handleSubmit, register, watch, control } =
    useForm();

  const typeDisp = watch("tipo");

  const navi = useNavigate();
  const queryClien = useQueryClient();
  if (idDisp !== undefined) {
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
    if (!data) return MutateCreate(datos);
    return UpdateDisp(datos);
  };
  return (
    <main className="mt-8 pb-8">
      <form onSubmit={handleSubmit(HandleSubt)}>
        <article className="grid grid-cols-2 gap-3">
          <section className="grid">
            <label>Nombre</label>
            <input
              type="text"
              {...register("nombre")}
              className="w-full py-2 border indent-2"
            />
          </section>
          <section className="grid">
            <label>Tipo</label>
            <select {...register("tipo")} className="border py-2 indent-2 px-2">
              <option defaultValue="Defa">Seleccionar</option>
              {CategoryInventaio.filter(
                (value) => value.name !== "General"
              ).map((value) => (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </section>
        </article>
        <div className="grid">
          <label>Estado </label>
          <select
            {...register("estado")}
            className="border py-2 rounded-md indent-1"
          >
            <option value="Activo">Activo</option>
            <option value="Inaperativa">Inaperativa</option>
            <option value="Malograda">Malograda</option>
          </select>
        </div>
        {typeDisp !== "Defa" && (
          <ActionType
            type={typeDisp}
            register={register}
            watch={watch}
            setValue={setValue}
            control={control}
            getValues={getValues}
          />
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
            onClick={() => console.log("cancelaste")}
          >
            Cancelar
          </button>
        </article>
      </form>
    </main>
  );
}

export default CreateDisp;
