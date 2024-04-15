import { MarcasPCLAP } from '@/assets/DataDefault';
import { typePc } from '@/data/Device/pc/types';
import { validateEmptyForm } from '@/utils/useform/validateEmpty';
import ErrrorInput from '@Components/Input/ErrrorInput';
import Input from '@Components/Input/Input';
import Label from '@Components/Input/Label';
import Option from '@Components/Input/Option';
import Select from '@Components/Input/Select';
import React from 'react'
import { Controller } from 'react-hook-form';
import FormRed from '../components/Form-red';
import FormMotherboard from '../components/Form-motherboard';
import FormProcessor from '../components/Form-processor';
import Optiondevice from '../../link/Option-device';
import FormRam from '../components/Form-ram';
import FormStorage from '../components/Form-storage';
import FormGraphics from '../components/Form-graphics';

export default function FormServer({control,errors,watch}) {
  return (
    <>
    <div className="grid gap-1 mt-2 md:grid-cols-4 md:gap-3">
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
                {typePc?.map((typePc) => {
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
      <main className="md:min-[200px]:flex   gap-3">
        <section>
          <div className="grid md:grid-cols-2 md:gap-3">
            <FormRed control={control} />
            <FormMotherboard control={control} errors={errors} />
          </div>
          <FormProcessor control={control} errors={errors} />
        </section>

        <Optiondevice control={control} watch={watch} />
      </main>
      <FormRam control={control} errors={errors} />
      <FormStorage control={control} errors={errors} />
      <FormGraphics control={control} />
      
    </>
  )
}
