import { MarcasPCLAP } from "@/assets/DataDefault";
import { validateEmptyForm } from "@/utils/useform/validateEmpty";
import ErrrorInput from "@Components/Input/ErrrorInput";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import Option from "@Components/Input/Option";
import Select from "@Components/Input/Select";
import React from "react";
import { Controller } from "react-hook-form";

function FormMotherboard({ control, errors }: { control: any; errors: any }) {
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

export default FormMotherboard;
