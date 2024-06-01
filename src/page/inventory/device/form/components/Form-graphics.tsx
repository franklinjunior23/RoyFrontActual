import Button from "@Components/Input/Button";
import Label from "@Components/Input/Label";
import { IconTrash } from "@tabler/icons-react";
import { Controller, useFieldArray } from "react-hook-form";
import Input from "@Components/Input/Input";

interface FormGraphicsProps {
  control: any;
}

function FormGraphics({ control }: FormGraphicsProps) {
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
          <main
            className="grid md:grid-cols-[repeat(4,1fr)_35px] my-0.5 gap-2 md:gap-3"
            key={field.id}
          >
            <Controller
              control={control}
              name={`Tarjeta_Video.${index}.detalle`}
              defaultValue={""}
              render={({ field }) => (
                <Label>
                  Marca
                  <Input {...field} />
                  
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
        <Button className="mt-2" onClick={() => append({ bus: "" })}>
          Agregar
        </Button>
      </div>
    </div>
  );
}

export default FormGraphics;
