import Button from "@Components/Input/Button";
import Label from "@Components/Input/Label";
import { IconTrash } from "@tabler/icons-react";
import { Controller, useFieldArray } from "react-hook-form";
import Input from "@Components/Input/Input";
import Option from "@Components/Input/Option";
import { validateEmptyForm } from "@/utils/useform/validateEmpty";
import Select from "@Components/Input/Select";
import { typeStorage } from "@/data/Device/pc/types-storage";
import ErrrorInput from "@Components/Input/ErrrorInput";

function FormStorage({ control, errors }: { control: any; errors: any }) {
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

export default FormStorage;
