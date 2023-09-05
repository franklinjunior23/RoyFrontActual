import { useForm } from "react-hook-form";
import { CategoryInventaio, FormDisp } from "../../../assets/DataDefault";
import PcLapForm from "./Components/PcLapForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services/ConfigApi";
import RedFrom from "./Components/RedFrom";
import ImpresForm from "./Components/ImpresForm";
import { useEffect } from "react";

function ActionType({ type, register, watch, setValue, control ,getValues }) {
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
    <ImpresForm register={register}
    watch={watch}
    setValue={setValue}
    control={control} />
  );
}

function CreateDisp() {
  const { nombreE, sucursalN } = useParams();

  const {setValue,getValues, handleSubmit, register, watch,  control,  } = useForm();
  const typeDisp = watch("tipo");
  const navi = useNavigate();
  const {idDisp}=useParams();
  if(idDisp){
    var {data}=useQuery({
      queryKey:['DispById'],
      queryFn:async()=>{
        const resp = await axiosInstance.get(`Dispositivos/${idDisp}`);
        return resp.data
      }
    })
    console.log(data)
  }
  useEffect(() => {
   if(data){
    FormDisp.forEach((param) => {
      
      if (data?.data && data?.data[param] !== null || undefined) {
        setValue(param, data.data[param]);
        if(data?.data[param] == undefined){
          setValue(param, data?.data.DetalleDispositivos[0][param]);
        }
      } 
    });
   }
  }, [data,setValue]);
  const mutation = useMutation({
    mutationFn: async (data) => {
      const resp = await axiosInstance.post(
        `Dispositivos/${nombreE}/${sucursalN}`,
        data
      );
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Dispositivo creado");
      navi(-1);
    },
  });
  const HandleSubt = async (data) => {
   
   await mutation.mutate(data);
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
              className="w-full py-2 border"
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
        {typeDisp !== "Defa" && (
          <ActionType
            type={typeDisp}
            register={register}
            watch={watch}
            setValue={setValue}
            control={control}
            getValues ={getValues}
          />
        )}
        <article className="grid grid-cols-2 mt-5 gap-2">
          <button
            type="submit"
            className="bg-black/90 rounded-md py-3 text-white"
          >
            Crear
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
