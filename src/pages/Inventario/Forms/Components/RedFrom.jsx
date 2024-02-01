import { Input, Select } from "@Components/Input";
import { TypeDevice, Brands } from "@/assets/Redes/RedesData";
function RedFrom({ register, setValue, control }) {
  return (
    <section className="mt-2">
      <section className="grid grid-cols-2 gap-x-3">
        <section>
          <Select
            label="Tipo De Dispositivo"
            register={register}
            options={TypeDevice}
          />
          <Select
            label="Marca de Red"
            register={register}
            name="marca"
            options={Brands}
          />
        </section>
        <section className="grid grid-cols-2 gap-x-3">
          <article>
            <Input register={register} name="Config_ip" label="Ip" />
            <Input register={register} name="Config_mac" label="Mac" />
          </article>
          <article>
            <Input register={register} name="Config_user" label="User" />
            <Input register={register} name="Config_contra" label="Paswoord" />
          </article>
        </section>
      </section>
    </section>
  );
}
export default RedFrom;
