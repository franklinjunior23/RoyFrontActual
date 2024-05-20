import { validateEmptyForm } from "@/utils/useform/validateEmpty";
import ErrrorInput from "@Components/Input/ErrrorInput";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import Option from "@Components/Input/Option";
import Select from "@Components/Input/Select";
import { Controller } from "react-hook-form";

function FormPrinter({ control, errors, watch }) {
  const TypePrint = ["Laser", "Inyección de tinta", "Matricial"];
  const TypeBrand = [
    "HP",
    "Canon",
    "Epson",
    "Brother",
    "Xerox",
    "Samsung",
    "Konica",
    "Kyocera",
    "Lexmark",
    "Oki",
    "Ricoh",
    "Sharp",
    "Toshiba",
    "Zebra",
    "Otro",
  ];
  const typeconect=[ "USB", "Red", "Inalámbrico","Inalambrico", "Bluetooth","Paralelo"]
  return (
    <>
      <section className="grid grid-cols-4 gap-4">
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
              Tipo
              <Select {...field}>
                {TypePrint?.map((typePc) => {
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
                {TypeBrand?.map((typePc) => {
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
          name="modelo"
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
          name="tipo_con"
          defaultValue={""}
          rules={{
            validate: {
              validateEmptyForm,
            },
          }}
          render={({ field }) => (
            <Label>
              Conexion
              <Select {...field}>
                {typeconect?.map((typePc) => {
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
          name="Config_user"
          defaultValue={""}
          render={({ field }) => (
            <Label>
              Usuario
              <Input {...field} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Config_contra"
          defaultValue={""}
          render={({ field }) => (
            <Label>
              Contraseña
              <Input {...field} />
            </Label>
          )}
        />
   
      </section>
    </>
  );
}

export default FormPrinter;
