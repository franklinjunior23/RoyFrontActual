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

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import VinculeArea from "./VinculeArea";
import InputSelect from "@Components/Input/Select/Select";
import { Input } from "@Components/Input";
import axiosInstance from "@/helpers/config/axios-instance";

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
    name: "Almacenamiento_detalle", // nombre del campo en el formulario
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
        <div className="grid grid-cols-3 gap-3 my-1">
          <InputSelect
            label={"Tipo"}
            register={register}
            name="tipo_Disp"
            options={Tipos_PCLAP}
          />
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
          </div>
          <Input label="Modelo" register={register} name="modelo" />
        </div>

        <div className="lg:grid grid-cols-2 mt-5 gap-5">
          <div>
            <article className="grid  gap-2 gap-x-3">
              <h3 className="my-1 text-xl font-semibold dark:text-white">
                Red
              </h3>
              <article className="grid grid-cols-2 gap-3">
                <Input
                  label="Dirrec. Mac"
                  register={register}
                  name="Config_mac"
                />
                <Input label="Ip Equipo" register={register} name="Config_ip" />
              </article>
            </article>
            <h3 className="my-1 text-xl font-semibold dark:text-white">
              Placa
            </h3>
            <article className="grid grid-cols-2 gap-2">
              <div className="grid">
                <label className="dark:text-white text-sm">Marca</label>

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

              <Input label="Modelo" register={register} name="Placa_detalle" />
            </article>
            <div>
              <h3 className="my-1 text-xl font-semibold dark:text-white">
                Procesador
              </h3>
              <article className="grid grid-cols-2 gap-2">
                <label className="dark:text-white text-sm grid ">
                  Marca
                  <InputsOptions
                    name={"Procesador_marca"}
                    register={register}
                    setValue={setValue}
                    options={ModeloProcesador}
                    getValues={getValues}
                  />
                  <input
                    className="hidden"
                    type="text"
                    {...register("Procesador_marca")}
                  />
                </label>

                <Input
                  label="Modelo"
                  register={register}
                  name="Procesador_modelo"
                />
              </article>
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
            </div>
          </div>
          <div>
            <article className="grid  gap-2">
              <div>
                <h3 className="py-1.5 text-xl font-semibold dark:text-white">
                  Ram
                </h3>
                <article className="grid  gap-2">
                  <div className="">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className=" w-full  grid grid-cols-[1fr_1fr_1fr_1fr_1fr_30px]  gap-1.5 mb-2"
                      >
                        <label className="text-sm dark:text-white grid g">
                          Marca
                          <InputsOptions
                            name={`Ram_Modulos.${index}.marca`}
                            register={register}
                            setValue={setValue}
                            options={marcasMemoriaRAM}
                            getValues={getValues}
                          />
                        </label>

                        <Input
                          label="Serial"
                          register={register}
                          name={`Ram_Modulos.${index}.serial`}
                        />

                        <Input
                          label="GB"
                          register={register}
                          name={`Ram_Modulos.${index}.gb`}
                        />

                        <label className="text-sm dark:text-white grid justify-between gap-1">
                          Tipo
                          <select
                            {...register(`Ram_Modulos.${index}.tipo`, {
                              require: true,
                            })}
                            defaultValue={field.tipo}
                            placeholder="DDR3 | DDR4"
                            className=" form-input "
                          >
                            <option value="def" className="text-sm">
                              Seleccionar
                            </option>
                            <option value="DDR3" className="text-sm">
                              DDR3
                            </option>
                            <option value="DDR4" className="text-sm">
                              DDR4
                            </option>
                          </select>
                        </label>
                        <Input
                          label="Mhz"
                          register={register}
                          name={`Ram_Modulos.${index}.mhz`}
                        />

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
              <div className="">
                <h3 className="py-3 text-xl font-semibold dark:text-white">
                  Almacenamiento
                </h3>
                {fieldAlmacenamiento.map((field, index) => (
                  <div
                    key={field.id}
                    className=" w-full grid grid-cols-[1fr_1fr_1fr_1fr_30px] gap-2 mb-3"
                  >
                    <label className="text-sm dark:text-white grid gap-1.5">
                      Tipo
                      <select
                        {...register(`Almacenamiento_detalle.${index}.tipo`, {
                          require: true,
                        })}
                        defaultValue={field.marca}
                        placeholder="DDR3 | DDR4"
                        className="form-input"
                      >
                        <option value="SSD">SSD</option>
                        <option value="HDD">HDD</option>
                        <option value="M.2">M.2</option>
                        <option value="NVM">NVM</option>
                        <option value="One Drive">One Drive</option>
                        <option value="Drive">Drive</option>
                        <option value="Virtual">Virtual</option>
                      </select>
                    </label>

                    <Input
                      label="Serial"
                      register={register}
                      name={`Almacenamiento_detalle.${index}.serial`}
                    />
                    <Input
                      label="Gb"
                      placeholder="GB"
                      register={register}
                      name={`Almacenamiento_detalle.${index}.gb`}
                    />
                    <Input
                      label="Tipo"
                      placeholder="Tipo"
                      register={register}
                      name={`Almacenamiento_detalle.${index}.estado`}
                    />

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
                  onClick={() => AppendAlmacenamiento({gb:'',estado:'',serial:'',tipo:''})}
                >
                  <IconPlus />
                </button>
              </div>
              <article>
                <h3 className="py-3 text-xl font-semibold dark:text-white">
                  Tarjeta Grafica
                </h3>
                <div>
                  {FieldGrafica.map((field, index) => (
                    <div key={index} className="grid grid-cols-2 gap-x-5">
                      <Input
                        label="Vram"
                        register={register}
                        name={`Tarjeta_Video.${index}.vram`}
                      />
                      <Input
                        label="Bus"
                        register={register}
                        name={`Tarjeta_Video.${index}.bus`}
                      />
                      <Input
                        label="Modelo"
                        register={register}
                        name={`Tarjeta_Video.${index}.modelo`}
                      />
                      <Input
                        label="Detalle"
                        register={register}
                        name={`Tarjeta_Video.${index}.detalle`}
                      />
                    </div>
                  ))}
                </div>
              </article>
            </article>
          </div>
        </div>
        <section className="lg:grid grid-cols-2 gap-5">
          <input type="text" hidden {...register("IdUser")} />
        </section>
      </section>
      
    </>
  );
}
export default PcLapForm;
