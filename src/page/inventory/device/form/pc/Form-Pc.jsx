import { marcasMemoriaRAM, MarcasPCLAP } from "@/assets/DataDefault";
import { typePc } from "@/data/Device/pc/types";
import { validateEmptyForm } from "@/utils/useform/validateEmpty";
import ErrrorInput from "@Components/Input/ErrrorInput";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import Option from "@Components/Input/Option";
import Select from "@Components/Input/Select";
import PropTypes from "prop-types";

import { Controller, useFieldArray } from "react-hook-form";
import Optiondevice from "../Option-device";
import Button from "@Components/Input/Button";
import { typeStorage } from "@/data/Device/pc/types-storage";
import { IconTrash } from "@tabler/icons-react";

const FormPc = ({ control, errors, watch }) => {
  const WatchTypeDevice = watch("tipo");
  return (
    <>
      <div className="grid grid-cols-4 gap-3 mt-2">
        <Controller
          control={control}
          name="tipo_Disp"
          defaultValue={""}
          rules={{
            validate: {
              validateEmptyForm,
            },
          }}
          render={({ field }) => (
            <Label>
              Tipo Dispositivo
              <Select {...field}>
                {WatchTypeDevice === "Pc" &&
                  typePc?.map((typePc) => {
                    return (
                      <Option value={typePc} key={typePc}>
                        {typePc}
                      </Option>
                    );
                  })}
              </Select>
              <ErrrorInput name={field.name} err={errors} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="marca"
          defaultValue={""}
          rules={{
            validate: {
              validateEmptyForm,
            },
          }}
          render={({ field }) => (
            <Label>
              Marca
              <Select {...field}>
                {MarcasPCLAP.map((marca) => {
                  return (
                    <Option value={marca} key={marca}>
                      {marca}
                    </Option>
                  );
                })}
              </Select>
              <ErrrorInput name={field.name} err={errors} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="modelo"
          defaultValue={""}
          render={({ field }) => (
            <Label>
              Modelo
              <Input {...field} />
            </Label>
          )}
        />
      </div>
      <main className="grid grid-cols-2 gap-3">
        <section>
          <RedForm control={control} />
          <Optiondevice />
        </section>
        <section>
          <PlacaMadreForm control={control} errors={errors} />
          <Procesador control={control} errors={errors} />
        </section>
      </main>
      <Ram control={control} errors={errors} />
      <Storage control={control} errors={errors} />
      <GrapichCard control={control} />
    </>
  );
};
export default FormPc;
FormPc.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
  watch: PropTypes.any,
};

// Component Red Form
function RedForm({ control }) {
  return (
    <div className="py-2">
      <h2 className="font-semibold text-xl border-b my-2 border-black/20 dark:border-white/40">
        Red
      </h2>
      <main className="grid grid-cols-2 gap-3">
        <Controller
          control={control}
          name="Config_ip"
          defaultValue={""}
          render={({ field }) => (
            <Label>
              Ip
              <Input {...field} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Config_mac"
          defaultValue={""}
          render={({ field }) => (
            <Label>
              Mac
              <Input {...field} />
            </Label>
          )}
        />
      </main>
    </div>
  );
}
RedForm.propTypes = {
  control: PropTypes.any,
};
// end Component Red Form

// Component Placa Madre Form
function PlacaMadreForm({ control, errors }) {
  return (
    <div className="py-2">
      <h2 className="font-semibold text-xl border-b my-2 border-black/20 dark:border-white/40">
        Placa Madre
      </h2>
      <main className="grid grid-cols-[1fr_1fr_60px] gap-3">
        <Controller
          control={control}
          name="Placa_modelo"
          defaultValue={""}
          rules={{
            validate: {
              validateEmptyForm,
            },
          }}
          render={({ field }) => (
            <Label>
              Marca
              <Select {...field}>
                {MarcasPCLAP.map((marca) => {
                  return (
                    <Option value={marca} key={marca}>
                      {marca}
                    </Option>
                  );
                })}
              </Select>
              <ErrrorInput name={field.name} err={errors} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Placa_detalle"
          defaultValue={""}
          render={({ field }) => (
            <Label>
              Modelo
              <Input {...field} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Placa_slots"
          defaultValue={"0"}
          render={({ field }) => (
            <Label>
              Slots
              <Input type="number" min={0} max={6} {...field} />
            </Label>
          )}
        />
      </main>
    </div>
  );
}
PlacaMadreForm.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
};

// end Component Placa Madre Form

// Component Prcoesador Form
function Procesador({ control, errors }) {
  return (
    <div className="py-2">
      <h2 className="font-semibold text-xl border-b my-2 border-black/20 dark:border-white/40">
        Procesador
      </h2>
      <main className="grid md:grid-cols-2 gap-2 md:gap-3">
        <Controller
          control={control}
          name="Procesador_marca"
          defaultValue={""}
          rules={{
            validate: {
              validateEmptyForm,
            },
          }}
          render={({ field }) => (
            <Label>
              Marca
              <Select {...field}>
                {["Intel", "Amd"].map((marca) => {
                  return (
                    <Option value={marca} key={marca}>
                      {marca}
                    </Option>
                  );
                })}
              </Select>
              <ErrrorInput name={field.name} err={errors} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Procesador_modelo"
          defaultValue={""}
          render={({ field }) => (
            <Label>
              Modelo
              <Input {...field} />
            </Label>
          )}
        />
      </main>
    </div>
  );
}
Procesador.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
};
// end Component Procesador Form

// Component Ram Form

function Ram({ control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Ram_Modulos",
  });
  return (
    <div className="py-2">
      <h2 className="font-semibold text-xl border-b my-2 border-black/20 dark:border-white/40">
        Memoria Ram
      </h2>
      <div className="grid gap-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="grid md:grid-cols-[repeat(5,1fr)_35px] gap-2 md:gap-3">
              <Controller
                control={control}
                name={`Ram_Modulos.${index}.marca`}
                defaultValue={""}
                rules={{
                  validate: {
                    validateEmptyForm,
                  },
                }}
                render={({ field }) => (
                  <Label>
                    Marca
                    <Select {...field}>
                      {marcasMemoriaRAM.map((marca) => {
                        return (
                          <Option value={marca} key={marca}>
                            {marca}
                          </Option>
                        );
                      })}
                    </Select>
                    <ErrrorInput
                      name={`Ram_Modulos.${index}.marca`}
                      err={errors}
                    />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Ram_Modulos.${index}.tipo`}
                defaultValue={""}
                rules={{
                  validate: {
                    validateEmptyForm,
                  },
                }}
                render={({ field }) => (
                  <Label>
                    Tipo
                    <Select {...field}>
                      <Option value="DDR3">DDR3</Option>
                      <Option value="DDR4">DDR4</Option>
                    </Select>
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Ram_Modulos.${index}.serial`}
                defaultValue={""}
                render={({ field }) => (
                  <Label>
                    Serial
                    <Input {...field} />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Ram_Modulos.${index}.gb`}
                defaultValue={""}
                render={({ field }) => (
                  <Label>
                    Gb
                    <Input {...field} />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Ram_Modulos.${index}.mhz`}
                defaultValue={""}
                render={({ field }) => (
                  <Label>
                    MHz
                    <Input {...field} />
                  </Label>
                )}
              />
              <Button
                type="button"
                className="grid place-content-center"
                variant="danger"
                onClick={() => remove(index)}
              >
                <IconTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="mt-4"
        onClick={() => append({ marca: "" })}
      >
        Agregar
      </Button>
    </div>
  );
}
Ram.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
};
// end Component Ram Form

// Component Storage Form

function Storage({ control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Almacenamiento_detalle",
  });
  return (
    <div className="py-2">
      <h2 className="font-semibold text-xl border-b my-2 border-black/20 dark:border-white/40">
        Almacenamiento
      </h2>
      <div className="grid gap-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="grid md:grid-cols-[repeat(5,1fr)_35px] gap-2 md:gap-3">
              <Controller
                control={control}
                name={`Almacenamiento_detalle.${index}.marca`}
                defaultValue={""}
                rules={{
                  validate: {
                    validateEmptyForm,
                  },
                }}
                render={({ field }) => (
                  <Label>
                    Marca
                    <Select {...field}>
                      {typeStorage.map((marca) => {
                        return (
                          <Option value={marca} key={marca}>
                            {marca}
                          </Option>
                        );
                      })}
                    </Select>
                    <ErrrorInput
                      name={`Almacenamiento_detalle.${index}.marca`}
                      err={errors}
                    />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Almacenamiento_detalle.${index}.tipo`}
                defaultValue={""}
                rules={{
                  validate: {
                    validateEmptyForm,
                  },
                }}
                render={({ field }) => (
                  <Label>
                    Tipo
                    <Select {...field}>
                      <Option value="HDD">HDD</Option>
                      <Option value="SSD">SSD</Option>
                      <Option value="M.2">M.2</Option>
                      <Option value="NVM">NVM</Option>
                      <Option value="NVMe">NVMe</Option>
                      <Option value="SATA">SATA</Option>
                      <Option value="OneDrive">OneDrive</Option>
                      <Option value="Drive">Drive</Option>
                      <Option value="Dropbox">Dropbox</Option>
                    </Select>
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Almacenamiento_detalle.${index}.serial`}
                defaultValue={""}
                render={({ field }) => (
                  <Label>
                    Serial
                    <Input {...field} />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Almacenamiento_detalle.${index}.gb`}
                defaultValue={""}
                render={({ field }) => (
                  <Label>
                    Gb
                    <Input {...field} />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name={`Almacenamiento_detalle.${index}.estado`}
                defaultValue={""}
                render={({ field }) => (
                  <Label>
                    Ubicacion
                    <Input {...field} />
                  </Label>
                )}
              />
              <Button
                type="button"
                className="grid place-content-center"
                variant="danger"
                onClick={() => remove(index)}
              >
                <IconTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="mt-4"
        onClick={() => append({ marca: "" })}
      >
        Agregar
      </Button>
    </div>
  );
}
Storage.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
};
// end Component Storage Form

// Component Grapich Card Form
function GrapichCard({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Tarjeta_Video",
  });
  return (
    <div className="py-2">
      <h2 className="font-semibold text-xl border-b my-2 border-black/20 dark:border-white/40">
        Tarjeta Grafica
      </h2>
      <div>
        {fields.map((field, index) => (
          <main className="grid md:grid-cols-[repeat(4,1fr)_35px] gap-2 md:gap-3" key={field.id}>
            <Controller
              control={control}
              name={`Tarjeta_Video.${index}.detalle`}
              defaultValue={""}
              render={({ field }) => (
                <Label>
                  Marca
                  <Input {...field} />
                  {/**  <Select {...field}>
                      {["Nvidia", "Amd"].map((marca) => {
                        return (
                          <Option value={marca} key={marca}>
                            {marca}
                          </Option>
                        );
                      })}
                    </Select> */}
                </Label>
              )}
            />
            <Controller
              control={control}
              name={`Tarjeta_Video.${index}.modelo`}
              defaultValue={""}
              render={({ field }) => (
                <Label>
                  Modelo
                  <Input {...field} />
                </Label>
              )}
            />
            <Controller
              control={control}
              name={`Tarjeta_Video.${index}.bus`}
              defaultValue={""}
              render={({ field }) => (
                <Label>
                  Bus
                  <Input {...field} />
                </Label>
              )}
            />
            <Controller
              control={control}
              name={`Tarjeta_Video.${index}.vram`}
              defaultValue={""}
              render={({ field }) => (
                <Label>
                  Vram
                  <Input {...field} />
                </Label>
              )}
            />
            <Button
              type="button"
              className="grid place-content-center"
              variant="danger"
              onClick={() => remove(index)}
            >
              <IconTrash />
            </Button>
          </main>
        ))}
        <Button className="mt-2" onClick={()=>append({bus:''})}>Agregar</Button>
      </div>
    </div>
  );
}
GrapichCard.propTypes = {
  control: PropTypes.any,
};

// end Component Grapich Card Form
