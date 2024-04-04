import { validateEmptyForm } from '@/utils/useform/validateEmpty';
import ErrrorInput from '@Components/Input/ErrrorInput';
import Input from '@Components/Input/Input';
import Label from '@Components/Input/Label';
import Option from '@Components/Input/Option';
import Select from '@Components/Input/Select';
import React from 'react'
import { Controller } from 'react-hook-form';

function FormProcessor({control,errors}: {control: any, errors: any }) {
  const brands = ["INTEL", "AMD"]
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
              {brands.map((marca) => {
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
  )
}

export default FormProcessor