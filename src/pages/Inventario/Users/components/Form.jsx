import { useForm } from "react-hook-form";
import Input from "./Input";
import InputSelect from "./InputSelect";
import {
  TYPE_DOC,
  TYPER_USERS,
  ESTATUS_USER,
  LEVEL_RED,
} from "@Data/DataDefault";
import PropTypes from "prop-types";
import clsx from "clsx";
import FieldsEmail from "./FieldsEmail";
import { AddDataForm } from "../Utils";
import { useEffect } from "react";

export default function Form({ data }) {
  console.log(data);
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  function handleEnv(datos) {
    console.log(datos);
  }

  useEffect(() => {
    if (data.length !== 0) AddDataForm({ data, setValue });
  }, [data]);
  return (
    <form onSubmit={handleSubmit(handleEnv)}>
      <RowColumn className={"gap-5"}>
        <section>
          <h3 className="border-b pb-1 mb-2 dark:text-white">
            Datos Personales
          </h3>
          <Input
            name={"nombre"}
            label={"Nombre"}
            register={register}
            error={errors}
          />
          <Input
            name={"apellido"}
            label={"Apellido"}
            register={register}
            error={errors}
          />
          <RowColumn>
            <InputSelect
              name="tipo_doc"
              label="Tipo Doc"
              register={register}
              options={TYPE_DOC}
            />
            <Input
              name="doc"
              type={"number"}
              label={`${watch("tipo_doc")}`}
              register={register}
              error={errors}
            />
          </RowColumn>
          <section>
            <RowColumn className={"mt-0.5"}>
              <Input
                name="cargo"
                label="Cargo"
                register={register}
                error={errors}
              />
              <InputSelect
                name="tipo_usuario"
                label="Tipo Usuario"
                register={register}
                options={TYPER_USERS}
              />
            </RowColumn>
            <InputSelect
                name="genero"
                label="Genero"
                register={register}
                options={[{value:'Masculino'},{value:'Femenino'}]}
              />
            <h3 className="border-b mt-2 pb-1 mb-2 dark:text-white">Email</h3>
            <FieldsEmail register={register} control={control} error={errors} />
          </section>
        </section>
        <section>
          <h3 className="border-b pb-1 mb-2 dark:text-white">Anydesk</h3>
          <RowColumn>
            <Input
              name="anydesk_id"
              label="Id"
              register={register}
              error={errors}
            />
            <Input
              name="anydesk_contra"
              label="Contraseña"
              register={register}
              error={errors}
            />
          </RowColumn>
          <h3 className="border-b pb-1 mb-2 mt-5 dark:text-white">Estado</h3>
          <InputSelect
            label="Estado del Usuario"
            name="estado"
            register={register}
            className={"text-center"}
            options={ESTATUS_USER}
          />
          <h3 className="border-b pb-1 mb-2 mt-5 dark:text-white">Red</h3>
          <InputSelect
            label="Nivel de Red"
            name="nivel_red"
            register={register}
            className={"text-center"}
            options={LEVEL_RED}
          />

          <RowColumn className={"mt-2"}>
            <Input
              label="Usuario"
              name="usuario"
              error={errors}
              register={register}
            />
            <Input
              label="Contraseña"
              name="contraseña"
              error={errors}
              register={register}
            />
          </RowColumn>
          {
            data?.Dispositivo ? (<h2>Existe pc</h2>):<h3>No existe pc</h3>
          }
          <footer className="w-full grid grid-cols-2 mt-5">
            <button type="submit" className="bg-black">Enviar</button>
            <button type="button" className="bg-black">Cancelar</button>
          </footer>
        </section>
      </RowColumn>
    </form>
  );
}

function RowInfoDevice({data}){
  const {nombre,tipo,codigo} = data
  return (
    <article>

    </article>
  )
}
RowInfoDevice.propTypes={
  data:PropTypes.object.isRequired
}

export function RowColumn({ children, className }) {
  return (
    <section className={clsx("grid md:grid-cols-2 gap-2", className)}>
      {children}
    </section>
  );
}
RowColumn.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Form.propTypes = {
  data: PropTypes.array,
};
