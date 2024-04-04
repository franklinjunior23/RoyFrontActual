import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";

import React from "react";
import { Controller } from "react-hook-form";

interface FormRedProps {
  control: any;
}

function FormRed({ control}: FormRedProps) {
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
  )
}

export default FormRed;
