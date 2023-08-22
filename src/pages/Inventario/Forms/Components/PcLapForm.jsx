import { useFieldArray } from "react-hook-form";
import {
  MarcasPCLAP,
  ModeloProcesador,
  marcasMemoriaRAM,
} from "../../../../assets/DataDefault";
import InputsOptions from "./InputsOptions";

function PcLapForm({ register, setValue, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ram_modulos", // nombre del campo en el formulario
  });
  return (
    <>
      <section>
        <article className="grid grid-cols-2 gap-2">
          <div className="grid">
            <label>Marca</label>
            <InputsOptions
              name={"marca"}
              register={register}
              setValue={setValue}
              options={MarcasPCLAP}
            />
          </div>
          <div className="grid">
            <label>Modelo</label>
            <input
              type="text"
              {...register("serie")}
              className="border py-2 w-full indent-2"
            />
          </div>
          <div className="grid">
            <label>Dirrec. Mac</label>
            <input
              type="number"
              {...register("Config_mac")}
              className="border py-2 w-full indent-2"
            />
          </div>
          <div className="grid">
            <label>Ip Equipo</label>
            <input
              type="number"
              {...register("Config_ip")}
              className="border py-2 w-full indent-2"
            />
          </div>
        </article>
        <h3 className="py-3 text-xl text-center">Placa</h3>
        <article className="grid grid-cols-2 gap-2">
          <div className="grid">
            <label>Marca</label>
            <InputsOptions
              name={"Placa_modelo"}
              register={register}
              setValue={setValue}
              options={MarcasPCLAP}
            />
          </div>
          <div className="grid">
            <label>Modelo</label>
            <input
              type="text"
              {...register("Placa_detalle")}
              className="border py-2 w-full indent-2"
            />
          </div>
        </article>
        <h3 className="py-3 text-xl text-center">Procesador</h3>
        <article className="grid grid-cols-2 gap-2">
          <div className="grid">
            <label>Marca</label>
            <InputsOptions
              name={"Procesador_marca"}
              register={register}
              setValue={setValue}
              options={ModeloProcesador}
            />
          </div>
          <div className="grid">
            <label>Modelo</label>
            <input
              type="text"
              {...register("Procesador_modelo")}
              className="border py-2 w-full indent-2"
            />
          </div>
        </article>
        <h3 className="py-3 text-xl text-center">Ram</h3>
        <article className="grid  gap-2">
          <div className="grid">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className=" w-full grid grid-cols-3 gap-2 mb-3"
              >
                <InputsOptions
                  name={`Ram_modulos.${index}.marca`}
                  register={register}
                  setValue={setValue}
                  options={marcasMemoriaRAM}
                />

                <input
                  {...register(`Ram_modulos.${index}.mhz`, {
                    require: true,
                  })}
                  defaultValue={field.mhz}
                  placeholder="MHz"
                  className="w-full border py-2 indent-2"
                />
                <button
                  type="button"
                  className=" bg-red-400 rounded-md text-white"
                  onClick={() => remove(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              className="border w-full py-3 mt-5 rounded-md bg-slate-500/50 text-white"
              onClick={() => append({ marca: "", mhz: "" })}
            >
              Agregar RAM
            </button>
          </div>
        </article>
      </section>
    </>
  );
}
export default PcLapForm;
