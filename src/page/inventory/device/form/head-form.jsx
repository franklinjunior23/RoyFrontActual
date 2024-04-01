import { CategoryInventaio } from "@/assets/DataDefault";
import { statusDevice } from "@/data/Device/status";
import { validateEmptyForm } from "@/utils/useform/validateEmpty";
import ErrrorInput from "@Components/Input/ErrrorInput";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import Option from "@Components/Input/Option";
import Select from "@Components/Input/Select";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

function HeadForm({ control, errors }) {
  return (
    <>
      <header>
        <div className="grid grid-cols-4 gap-3">
          <Controller
            control={control}
            name="nombre"
            defaultValue={""}
            render={({ field }) => (
              <Label>
                Nombre Dispositivo
                <Input {...field} type="text" />
              </Label>
            )}
          />
          <Controller
            control={control}
            defaultValue={""}
            name="Codigo"
            render={({ field }) => (
              <Label>
                Codigo
                <Input
                  {...field}
                  type="text"
                  placeholder="Codigo Generado Automaticamente"
                />
              </Label>
            )}
          />
          <Controller
            control={control}
            defaultValue={""}
            name="tipo"
            rules={{
              validate: {
                validateEmptyForm,
              },
            }}
            render={({ field }) => (
              <>
                <Label>
                  Tipo Device
                  <Select {...field} placeholder="Seleccionar el tipo">
                    {CategoryInventaio.map(({ name }) => {
                      return (
                        <Option value={name} key={name}>
                          {name}
                        </Option>
                      );
                    })}
                  </Select>
                  <ErrrorInput name={field.name} err={errors} />
                </Label>
              </>
            )}
          />
          <Controller
            control={control}
            name="estado"
            defaultValue={""}
            rules={{
              validate: {
                validateEmptyForm,
              },
            }}
            render={({ field }) => (
              <Label>
                Estado
                <Select {...field} placeholder="Seleccionar el tipo">
                  {statusDevice.map((status) => {
                    return (
                      <Option value={status} key={status}>
                        {status}
                      </Option>
                    );
                  })}
                </Select>
                <ErrrorInput name={field.name} err={errors} />
              </Label>
            )}
          />
        </div>
      </header>
    </>
  );
}

export default HeadForm;

HeadForm.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
};
