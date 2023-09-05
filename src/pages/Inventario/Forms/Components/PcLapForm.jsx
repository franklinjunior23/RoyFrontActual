import { useFieldArray } from "react-hook-form";
import {
  MarcasPCLAP,
  ModeloProcesador,
  marcasMemoriaRAM,
} from "../../../../assets/DataDefault";
import InputsOptions from "./InputsOptions";

function PcLapForm({ register, setValue, control,watch,getValues }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ram_modulos", // nombre del campo en el formulario
  });
  const { fields:fieldAlmacenamiento, append:AppendAlmacenamiento, remove:RemoveAlmacenamiento } = useFieldArray({
    control,
    name: "Almacenamiento", // nombre del campo en el formulario
  });
  return (
    <>
      <section>
        <div className="grid my-3">
          <label>Tipo</label>
          <select
            {...register("tipo_Disp")}
            className="border  py-2 w-full indent-2"
          >
            <option value="Laptop">Laptop</option>
            <option value="PC-Compatible">PC-Compatible</option>
            <option value="PC-Workstation">PC-Workstation</option>
            <option value="Servidor Desktop">Servidor Desktop</option>
            <option value="Servidor Torre">Servidor Torre</option>
          </select>
        </div>
        <article className="grid grid-cols-2 gap-2">
          <div className="grid">
            <label>Marca</label>
            <InputsOptions
              name={"marca"}
              register={register}
              setValue={setValue}
              options={MarcasPCLAP}
              watch={watch}
              getValues={getValues}
            />
          </div>
          <div className="grid">
            <label>Modelo</label>
            <input
              type="text"
              {...register("modelo")}
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
        <div className="lg:grid grid-cols-2 gap-5">
          <div>
            <h3 className="py-3 text-xl font-semibold">Placa</h3>
            <article className="grid grid-cols-2 gap-2">
              <div className="grid">
                <label>Marca</label>
                <InputsOptions
                  name={"Placa_modelo"}
                  register={register}
                  setValue={setValue}
                  options={MarcasPCLAP}
                  getValues={getValues}
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
          </div>
          <div>
            <h3 className="py-3 text-xl font-semibold">Procesador</h3>
            <article className="grid grid-cols-2 gap-2">
              <div className="grid">
                <label>Marca</label>
                <InputsOptions
                  name={"Procesador_marca"}
                  register={register}
                  setValue={setValue}
                  options={ModeloProcesador}
                  getValues={getValues}
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
          </div>
        </div>
        <section className="lg:grid grid-cols-2 gap-5">
          <div>
            <h3 className="py-3 text-xl font-semibold">Ram</h3>
            <article className="grid  gap-2">
              <div className="grid">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className=" w-full grid grid-cols-4 gap-2 mb-3"
                  >
                    <InputsOptions
                      name={`Ram_modulos.${index}.marca`}
                      register={register}
                      setValue={setValue}
                      options={marcasMemoriaRAM}
                    />
                    <select
                      {...register(`Ram_modulos.${index}.tipo`, {
                        require: true,
                      })}
                      defaultValue={field.tipo}
                      placeholder="DDR3 | DDR4"
                      className="w-full border py-2 indent-2"
                    >
                      <option value="def">Seleccionar</option>
                      <option value="DDR3">DDR3</option>
                      <option value="DDR4">DDR4</option>
                    </select>
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
                  onClick={() => append()}
                >
                  Agregar RAM
                </button>
              </div>
            </article>
          </div>
          <div>
            <h3 className="py-3 text-xl font-semibold">Almacenamiento</h3>
            <article className="grid  gap-2">
              <div className="grid">
                {fieldAlmacenamiento.map((field, index) => (
                  <div
                    key={field.id}
                    className=" w-full grid grid-cols-4 gap-2 mb-3"
                  >
                     <select
                      {...register(`Almacenamiento.${index}.tipo`, {
                        require: true,
                      })}
                      defaultValue={field.marca}
                      placeholder="DDR3 | DDR4"
                      className="w-full border py-2 indent-2"
                    >
                      <option value="def">Seleccionar</option>
                      <option value="SSD">SSD</option>
                      <option value="HDD">HDD</option>
                      <option value="M.2">M.2</option>
                      <option value="NVM">NVM</option>
                    </select>
                    
                    <input
                      {...register(`Almacenamiento.${index}.marca`, {
                        require: true,
                      })}
                      defaultValue={field.gb}
                      placeholder="marca"
                      className="w-full border py-2 indent-2"
                    />
                    <input
                      {...register(`Almacenamiento.${index}.gb`, {
                        require: true,
                      })}
                      defaultValue={field.gb}
                      placeholder="GB"
                      className="w-full border py-2 indent-2"
                    />
                    <button
                      type="button"
                      className=" bg-red-400 rounded-md text-white"
                      onClick={() => RemoveAlmacenamiento(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="border w-full py-3 mt-5 rounded-md bg-slate-500/50 text-white"
                  onClick={() => AppendAlmacenamiento({})}
                >
                  Agregar Almacenamiento
                </button>
              </div>
            </article>
          </div>
        </section>
      </section>
    </>
  );
}
export default PcLapForm;
