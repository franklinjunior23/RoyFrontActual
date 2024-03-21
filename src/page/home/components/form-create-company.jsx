import { useForm, Controller } from "react-hook-form";

import Input from "@/components/Input/Input";
import Label from "@Components/Input/Label";
import Button from "@Components/Input/Button";
import PropTypes from "prop-types";
import { PostCompany } from "../utils/actions/company-action";


export default function FormCompany({ handleCancel }) {
  const { mutate } = PostCompany();
  function HandleCreate(datos) {
    mutate(datos);
    handleCancel();
    reset()
  }


  const { handleSubmit, reset, control } = useForm();
  return (
    <form onSubmit={handleSubmit(HandleCreate)}>
      <Controller
        control={control}
        name="nombre"
        defaultValue={""}
        render={({ field }) => (
          <Label>
            Nombre <Input {...field} placeholder="Nombre de la empresa" />
          </Label>
        )}
      />
      <Controller
        control={control}
        name="lugar"
        defaultValue={""}
        render={({ field }) => (
          <Label>
            Nombre <Input {...field} placeholder="Lugar de la empresa" />
          </Label>
        )}
      />

      <footer className="mt-5 flex justify-end">
        <Button>Crear</Button>
        <Button variant="second" type="button" onClick={handleCancel}>
          Cancelar
        </Button>
      </footer>
    </form>
  );
}

FormCompany.propTypes = {
  handleCancel: PropTypes.func,
};
