import { marcasMemoriaRAM } from "@/assets/DataDefault";
import { validateEmptyForm } from "@/utils/useform/validateEmpty";
import Button from "@Components/Input/Button";
import ErrrorInput from "@Components/Input/ErrrorInput";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import Option from "@Components/Input/Option";
import Select from "@Components/Input/Select";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

interface FormRamProps {
  control: any;
  errors: any;
}

function FormRam({ control, errors }: FormRamProps) {
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

export default FormRam;
