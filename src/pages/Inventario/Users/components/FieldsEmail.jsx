import { useFieldArray } from "react-hook-form";
import InputSelect from "./InputSelect";
import { RowColumn } from "./Form";
import Input from "./Input";
import { TYPE_EMAILS } from "@Data/DataDefault";
import PropTypes from "prop-types";

function EmailField({ index, register, error, remove }) {
  return (
    <article>
      <InputSelect
        name={`Email.${index}.type`}
        label="Tipo Email"
        register={register}
        options={TYPE_EMAILS}
        error={error}
      />

      <RowColumn className={""}>
        <Input
          label="Correo"
          name={`Email.${index}.correo`}
          register={register}
          error={error}
        />
        <Input
          label="Contraseña"
          name={`Email.${index}.password`}
          register={register}
          error={error}
        />
      </RowColumn>
      <button
        type="button"
        className="bg-red-400 text-white text-xl px-2.5 font-semibold rounded-md"
        onClick={() => remove(index)}
      >
        -
      </button>
    </article>
  );
}

EmailField.propTypes = {
  index: PropTypes.number,
  register: PropTypes.func,
  error: PropTypes.any,
  remove: PropTypes.func,
};

function FieldsEmail({ control, register, error }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Email",
  });

  return (
    <>
      {fields.map((field, index) => (
        <EmailField
          key={field.id}
          index={index}
          register={register}
          error={error}
          remove={remove}
        />
      ))}
      <button
        onClick={() => append({ type: "WEB", correo: "", password: "" })}
        type="button"
        className="bg-black text-white px-2 font-semibold rounded-md text-xl mt-5"
      >
        +
      </button>
    </>
  );
}

FieldsEmail.propTypes = {
  control: PropTypes.object,
  register: PropTypes.func,
  error: PropTypes.any,
};

export default FieldsEmail;
