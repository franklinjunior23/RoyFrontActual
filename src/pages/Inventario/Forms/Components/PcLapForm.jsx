import { useFieldArray } from "react-hook-form";
import {
  MarcasPCLAP,
  ModeloProcesador,
  marcasMemoriaRAM,
  Tipos_PCLAP,
} from "@Data/DataDefault";
import InputsOptions from "./InputsOptions";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import axiosInstance from "@Services/ConfigApi";
import ItemInput from "./ItemInput";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import VinculeArea from "./VinculeArea";
import InputSelect from "../../../../components/Input/Select/Select";
import Input from "../../../../components/Input/Input/Input";

function PcLapForm({ register, setValue, control, watch, getValues, data }) {
  const [Areas, setAreas] = useState(null);

  const { nombreE, sucursalN } = useParams();
  useEffect(() => {
    async function GetsAreas() {
      try {
        const Response = await axiosInstance.get(
          `Areas?Company=${nombreE}&Branch=${sucursalN}`
        );
        return setAreas(Response?.data?.body);
      } catch (error) {
        toast.error(`Error : ${error?.message}`);
      }
    }
    GetsAreas();
  }, []);
  if (data) {
    var { IdUser, ...datos } = data;
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ram_Modulos", // nombre del campo en el formulario
  });

  const {
    fields: FieldGrafica,
    append: AppendGrafica,
    remove: RemoveGrafica,
  } = useFieldArray({
    control,
    name: "Tarjeta_Video", // nombre del campo en el formulario
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

  return (
    <>
      <section>
        <div className="grid my-3">
          <InputSelect label={"Tipo"} register={register} name="tipo_Disp"  options={Tipos_PCLAP}/>
        </div>
        <article className="grid grid-cols-4 gap-2 gap-x-3">
          <div className="grid">
            <label className="dark:text-white text-sm">Marca</label>
            
            <InputsOptions
              name={"marca"}
              register={register}
              setValue={setValue}
              options={MarcasPCLAP}
              watch={watch}
              getValues={getValues}
            />
            <input className="hidden" type="text" {...register("marca")} />
          </div>
          <div className="grid">
            <label className="dark:text-white text-sm">Modelo</label>
            <Input register={register} name="modelo" />
           
          </div>
          <div className="grid">
            <label className="dark:text-white text-sm">Dirrec. Mac</label>
            <Input register={register} name="Config_mac" />
          </div>
          <div className="grid">
            <label className="dark:text-white text-sm">Ip Equipo</label>
            <Input register={register} name="Config_ip" />
          </div>
        </article>
        <div className="lg:grid grid-cols-2 mt-5 gap-5">
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
                    className=" w-full  grid grid-cols-[1fr_1fr_1fr_1fr_1fr_30px]  gap-1.5 mb-2"
                  >
                    <div>
                      <label className="text-sm dark:text-white">Marca</label>
                      <InputsOptions
                        name={`Ram_Modulos.${index}.marca`}
                        register={register}
                        setValue={setValue}
                        options={marcasMemoriaRAM}
                        getValues={getValues}
                      />
                    </div>
                    <div>
                      <label className="text-sm dark:text-white">Serial</label>
                      <input
                        type="text"
                        className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none"
                        {...register(`Ram_Modulos.${index}.serial`, {
                          require: true,
                        })}
                      />
                    </div>
                    <div>
                      <label className="text-sm dark:text-white">Gb</label>
                      <input
                        type="text"
                        className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none"
                        {...register(`Ram_Modulos.${index}.gb`, {
                          require: true,
                        })}
                      />
                    </div>
                    <div className="grid">
                      <label className="text-sm dark:text-white">Tipo</label>
                      <select
                        {...register(`Ram_Modulos.${index}.tipo`, {
                          require: true,
                        })}
                        defaultValue={field.tipo}
                        placeholder="DDR3 | DDR4"
                        className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none"
                      >
                        <option value="def">Seleccionar</option>
                        <option value="DDR3">DDR3</option>
                        <option value="DDR4">DDR4</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm dark:text-white">Mhz</label>
                      <input
                        {...register(`Ram_Modulos.${index}.mhz`, {
                          require: true,
                        })}
                        defaultValue={field.mhz}
                        placeholder="MHz"
                        className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      className=" self-end bg-red-400 h-[65%]  w-full  rounded-md text-white grid place-content-center"
                      onClick={() => remove(index)}
                    >
                      <IconTrash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="border  px-3 dark:border-none font-medium text-sm py-1 mt-5 rounded-md bg-slate-500/70 text-white"
                  onClick={() => append()}
                >
                  <IconPlus />
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
                    className=" w-full grid grid-cols-[1fr_1fr_1fr_1fr_30px] gap-2 mb-3"
                  >
                    <div className="grid">
                      <label className="text-sm dark:text-white">Tipo</label>
                      <select
                        {...register(`Almacenamiento.${index}.tipo`, {
                          require: true,
                        })}
                        defaultValue={field.marca}
                        placeholder="DDR3 | DDR4"
                        className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent"
                      >
                        <option value="SSD">SSD</option>
                        <option value="HDD">HDD</option>
                        <option value="M.2">M.2</option>
                        <option value="NVM">NVM</option>
                        <option value="One Drive">One Drive</option>
                        <option value="Drive">Drive</option>
                        <option value="Virtual">Virtual</option>
                      </select>
                    </div>
                    <div className="grid">
                      <label className="text-sm dark:text-white">Serial</label>
                      <input
                        type="text"
                        className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none"
                        {...register(`Almacenamiento.${index}.serial`, {
                          require: true,
                        })}
                      />
                    </div>

                    <div className="grid">
                      <label className="text-sm dark:text-white">Gb</label>
                      <ItemInput
                        register={register}
                        name={`Almacenamiento.${index}.gb`}
                        require={true}
                        defaultValue={field.gb}
                        placeholder="GB"
                      />
                    </div>
                    <div className="grid">
                      <label className="text-sm dark:text-white">Tipo</label>
                      <input
                        type="text"
                        className="w-full  border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none"
                        {...register(`Almacenamiento.${index}.estado`, {
                          require: true,
                        })}
                      />
                    </div>
                    <button
                      type="button"
                      className=" bg-red-400 h-[65%] self-end grid place-content-center rounded-md text-white"
                      onClick={() => RemoveAlmacenamiento(index)}
                    >
                      <IconTrash />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="border  px-3 dark:border-none font-medium text-sm py-1 mt-5 rounded-md bg-slate-500/70 text-white"
                  onClick={() => AppendAlmacenamiento({})}
                >
                  <IconPlus />
                </button>
              </div>
            </article>
          </div>
          <article>
            <h3 className="py-3 text-xl font-semibold dark:text-white">
              Tarjeta Grafica
            </h3>
            <div>
              {FieldGrafica.map((field, index) => (
                <div key={index} className="grid grid-cols-2 gap-x-5">
                  <div>
                    <label className="text-sm dark:text-white">Vram</label>
                    <input
                      type="text"
                      className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none px-2"
                      {...register(`Tarjeta_Video.${index}.vram`)}
                    />
                  </div>
                  <div>
                    <label className="text-sm dark:text-white">Bus</label>
                    <input
                      type="text"
                      className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none px-2"
                      {...register(`Tarjeta_Video.${index}.bus`)}
                    />
                  </div>
                  <div>
                    <label className="text-sm dark:text-white">Modelo</label>
                    <input
                      type="text"
                      className="w-full border py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none px-2"
                      {...register(`Tarjeta_Video.${index}.modelo`)}
                    />
                  </div>
                  <div>
                    <label className="text-sm dark:text-white">Detalle</label>
                    <input
                      type="text"
                      className="w-full border   py-2 indent-2 dark:border-none  rounded-md dark:text-white dark:bg-DarkComponent focus:outline-none px-2"
                      {...register(`Tarjeta_Video.${index}.detalle`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <input type="text" hidden {...register("IdUser")} />
          <section className="mt-4 bg-gray-400  py-4 px-6 text-white dark:bg-gray-400/30 rounded-md">
            <VinculeArea
              Areas={Areas}
              dataAreas={data?.Areas}
              IdUser={IdUser}
              nombreE={nombreE}
              sucursalN={sucursalN}
              DataUsers={DataUsers}
              control={control}
              watch={watch}
              register={register}
            />
          </section>
        </section>
      </section>
    </>
  );
}
export default PcLapForm;
