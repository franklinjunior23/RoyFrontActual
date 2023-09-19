import { Controller, useFieldArray } from "react-hook-form";
import {
  MarcasPCLAP,
  ModeloProcesador,
  marcasMemoriaRAM,
} from "../../../../assets/DataDefault";
import InputsOptions from "./InputsOptions";
import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../../services/ConfigApi";
import ItemInput from "./ItemInput";

function PcLapForm({ register, setValue, control, watch, getValues, data }) {
  const { nombreE, sucursalN } = useParams();
  if (data) {
    var { IdUser, ...datos } = data;
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ram_Modulos", // nombre del campo en el formulario
  });
  const {
    fields: fieldAlmacenamiento,
    append: AppendAlmacenamiento,
    remove: RemoveAlmacenamiento,
  } = useFieldArray({
    control,
    name: "Almacenamiento", // nombre del campo en el formulario
  });
  const { data: DataUsers } = useQuery(["Client_Disp"], async () => {
    const { data } = await axiosInstance.get(
      `Users/Disp?empresa=${nombreE}&sucursal=${sucursalN}`
    );
    return data;
  });

  const DataUserConnect = watch("FormUser", false);
  return (
    <>
      <section>
        <div className="grid my-3">
          <label className="dark:text-white">Tipo</label>
          <select
            {...register("tipo_Disp")}
            className="rounded-md dark:bg-DarkComponent dark:border-none border dark:text-white py-2 w-full indent-2"
          >
            <option value="Laptop">Laptop</option>
            <option value="PC-Compatible">PC-Compatible</option>
            <option value="PC-Workstation">PC-Workstation</option>
            <option value="Servidor Desktop">Servidor Desktop</option>
            <option value="Servidor Torre">Servidor Torre</option>
          </select>
        </div>
        <article className="grid grid-cols-2 gap-2 gap-x-8">
          <div className="grid">
            <label className="dark:text-white">Marca</label>
            <input className="hidden" type="text" {...register("marca")} />
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
            <label className="dark:text-white">Modelo</label>
            <ItemInput register={register} name={"modelo"} />
          </div>
          <div className="grid">
            <label className="dark:text-white">Dirrec. Mac</label>
            <ItemInput register={register} name={"Config_mac"} />
          </div>
          <div className="grid">
            <label className="dark:text-white">Ip Equipo</label>
            <ItemInput register={register} name={"Config_ip"} />
          </div>
        </article>
        <div className="lg:grid grid-cols-2 gap-5">
          <div>
            <h3 className="py-3 text-xl font-semibold dark:text-white">
              Placa
            </h3>
            <article className="grid grid-cols-2 gap-2">
              <div className="grid">
                <label className="dark:text-white">Marca</label>

                <input
                  className="hidden"
                  type="text"
                  {...register("Placa_modelo")}
                />
                <InputsOptions
                  name={"Placa_modelo"}
                  register={register}
                  setValue={setValue}
                  options={MarcasPCLAP}
                  getValues={getValues}
                />
              </div>
              <div className="grid">
                <label className="dark:text-white">Modelo</label>
                <ItemInput register={register} name={"Placa_detalle"} />
              </div>
            </article>
          </div>
          <div>
            <h3 className="py-3 text-xl font-semibold dark:text-white">
              Procesador
            </h3>
            <article className="grid grid-cols-2 gap-2">
              <div className="grid">
                <label className="dark:text-white">Marca</label>
                <input
                  className="hidden"
                  type="text"
                  {...register("Procesador_marca")}
                />
                <InputsOptions
                  name={"Procesador_marca"}
                  register={register}
                  setValue={setValue}
                  options={ModeloProcesador}
                  getValues={getValues}
                />
              </div>
              <div className="grid">
                <label className="dark:text-white">Modelo</label>
                <ItemInput register={register} name={"Procesador_modelo"} />
              </div>
            </article>
          </div>
        </div>
        <section className="lg:grid grid-cols-2 gap-5">
          <div>
            <h3 className="py-3 text-xl font-semibold dark:text-white">Ram</h3>
            <article className="grid  gap-2">
              <div className="">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className=" w-full grid grid-cols-4 gap-2 mb-3"
                  >
                    <InputsOptions
                      name={`Ram_Modulos.${index}.marca`}
                      register={register}
                      setValue={setValue}
                      options={marcasMemoriaRAM}
                      getValues={getValues}
                    />
                    <select
                      {...register(`Ram_Modulos.${index}.tipo`, {
                        require: true,
                      })}
                      defaultValue={field.tipo}
                      placeholder="DDR3 | DDR4"
                      className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent"
                    >
                      <option value="def">Seleccionar</option>
                      <option value="DDR3">DDR3</option>
                      <option value="DDR4">DDR4</option>
                    </select>
                    <input
                      {...register(`Ram_Modulos.${index}.mhz`, {
                        require: true,
                      })}
                      defaultValue={field.mhz}
                      placeholder="MHz"
                      className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent"
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
                  className="border px-3 dark:border-none font-medium text-sm py-2 mt-5 rounded-md bg-slate-500/70 text-white"
                  onClick={() => append()}
                >
                  + Agregar
                </button>
              </div>
            </article>
          </div>
          <div>
            <h3 className="py-3 text-xl font-semibold dark:text-white">
              Almacenamiento
            </h3>
            <article className="grid  gap-2">
              <div className="">
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
                      className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent"
                    >
                      <option value="def">Tipo</option>
                      <option value="SSD">SSD</option>
                      <option value="HDD">HDD</option>
                      <option value="M.2">M.2</option>
                      <option value="NVM">NVM</option>
                    </select>
                    <ItemInput
                      register={register}
                      name={`Almacenamiento.${index}.marca`}
                      require={true}
                      defaultValue={field.gb}
                      placeholder="marca"
                    />
                    <ItemInput
                      register={register}
                      name={`Almacenamiento.${index}.gb`}
                      require={true}
                      defaultValue={field.gb}
                      placeholder="GB"
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
                  className="border dark:border-none font-medium text-sm px-3 ml-auto mx-0  py-2 mt-5 rounded-md bg-slate-500/70 text-white"
                  onClick={() => AppendAlmacenamiento({})}
                >
                  + Agregar
                </button>
              </div>
            </article>
          </div>
        </section>
        <section className="mt-4">
          <article className="border grid place-content-center py-4 dark:border-none dark:bg-DarkComponent rounded-md">
            <label className="font-medium text-lg dark:text-white ">
              Desea Asignarle Directamente a un usuario?
            </label>
            <div className="self-center">
              <label>
                <Controller
                  name="FormUser"
                  control={control}
                  defaultValue={false} // Valor inicial del checkbox
                  render={({ field }) => <input type="checkbox" {...field} />}
                />
              </label>
              <input type="text" hidden {...register("IdUser")} />
            </div>
            {DataUserConnect && (
              <div>
                {/* Formulario adicional que se muestra si se marca el checkbox */}
                <div className="grid">
                  <label className="dark:text-white mb-3">Nombre Usuario</label>
                  <select
                    {...register("IdUser")}
                    className="py-2 border indent-2 dark:border-none dark:bg-Component dark:text-white"
                  >
                    <option value="null">marcar</option>
                    {DataUsers?.map((value) => (
                      <option
                        value={value?.id}
                        disabled={value?.Dispositivo?.IdUser}
                        className={
                          value?.Dispositivo?.IdUser && "dark:text-slate-400"
                        }
                        key={value?.id}
                      >
                        {value?.nombre} {value?.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <section className="mt-10 grid place-content-center">
                  {IdUser && (
                    <Link
                      to={`/Dashboard/${nombreE}/${sucursalN}/Usuarios/${IdUser}`}
                      className="dark:text-white text-center border py-2 px-5 rounded-md"
                    >
                      Ver Personal Registrado
                    </Link>
                  )}
                </section>
              </div>
            )}
          </article>
        </section>
      </section>
    </>
  );
}
export default PcLapForm;
