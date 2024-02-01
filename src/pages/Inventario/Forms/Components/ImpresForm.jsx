import InputSelect from "@Components/Input/Select/Select";
import {
  TypePrints,
  Brands,
  TypeConection,
} from "@/assets/Print/PrintData.json";
import { Input } from "@Components/Input";
function ImpresForm({ register, setValue, control }) {
  return (
    <main className="mt-2">
      <section className="grid grid-cols-3 gap-2 md:gap-3 mt-2">
        <InputSelect
          register={register}
          name="tipo_Disp"
          label="Tipo Impresora"
          options={TypePrints}
        />
        <InputSelect
          register={register}
          name="marca"
          label="Marca"
          options={Brands}
        />
        <Input register={register} name="modelo" label="Modelo" />
      </section>
      <section className="grid grid-cols-2 gap-2 md:gap-3 mt-2 items-start">
        <InputSelect
          register={register}
          name="tipo_con"
          label="Tipo de Conexion"
          options={TypeConection}
        />

        <section>
          <Input register={register} name="Config_ip" label="Ip" />
          <section className="grid grid-cols-2 gap-3">
            <Input register={register} name="Config_user"  label="User" />
            <Input register={register} name="Config_contra" label="Paswoord" />
          </section>
        </section>
      </section>
    </main>
  );
}

export default ImpresForm;
