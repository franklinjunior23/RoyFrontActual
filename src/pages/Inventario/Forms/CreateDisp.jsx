import { useForm } from "react-hook-form";
import { CategoryInventaio } from "../../../assets/DataDefault";
import PcLapForm from "./Components/PcLapForm";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/ConfigApi";

function ActionType({ type, register, watch, setValue, control }) {
  if (!type || type === "Defa") {
    return null;
  }

  if (type === "Pc" || type === "Laptop" || type === "Servidores") {
    return (
      <PcLapForm
        register={register}
        watch={watch}
        setValue={setValue}
        control={control}
      />
    );
  } else {
    return <h2>son otras cosas</h2>;
  }
}

function CreateDisp() {
  const { nombreE, sucursalN } = useParams();

  const { handleSubmit, register, watch, setValue, control } = useForm();
  const typeDisp = watch("Tipo");

 
  const mutation = useMutation({
    mutationFn: async (data) => {
      const resp = await axiosInstance.post(
        `Dispositivos/${nombreE}/${sucursalN}`,
        data
      );
      return resp.data;
    },
    onSuccess: () => {
       return toast.success("cargando");
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
            <select {...register("Tipo")} className="border py-2">
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
