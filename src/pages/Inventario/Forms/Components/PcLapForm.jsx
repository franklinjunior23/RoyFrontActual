import { MarcasPCLAP, ModeloProcesador } from "../../../../assets/DataDefault";
import InputsOptions from "./InputsOptions";


function PcLapForm({ register, setValue }) {
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
            <label>Ip Equipo</label>
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
        <article className="grid grid-cols-2 gap-2">
          <div className="grid">
            <label>Cantidad</label>
            <input type="number" {...register('Ram_cantidad')} />
            
          </div>
          <div className="grid">
            <label>Modelo</label>
            
          </div>
        </article>
       
      </section>
    </>
  );
}
export default PcLapForm;
