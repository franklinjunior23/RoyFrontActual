import { useFieldArray } from "react-hook-form";
import InputSelect from "./InputSelect";
import { RowColumn } from "./Form";
import { TYPE_EMAILS } from "@Data/DataDefault";
import PropTypes from "prop-types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentUI/ui/form";
import { Input } from "@/componentUI/ui/input";
import { Button } from "@/componentUI/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/componentUI/ui/select";

function EmailField({ index, remove, control }) {
  console.log(TYPE_EMAILS);
  return (
    <article>
      <FormField
        control={control}
        name={`email.${index}.type`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Tipo de correo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TYPE_EMAILS?.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />

      <RowColumn className={""}>
        <FormField
          control={control}
          name={`email.${index}.correo`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="Correo" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`email.${index}.password`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </RowColumn>
      <Button
        variant="destructive"
        type="button"
        className="bg-red-400 flex justify-between text-white text-xl px-2.5 font-semibold rounded-md"
        onClick={() => remove(index)}
      >
        -
      </Button>
    </article>
  );
}

EmailField.propTypes = {
  index: PropTypes.number,
  error: PropTypes.any,
  remove: PropTypes.func,
  control: PropTypes.any,
};

function FieldsEmail({ control, error }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "email",
  });

  return (
    <>
      {fields.map((field, index) => (
        <EmailField
          key={field.id}
          index={index}
          remove={remove}
          control={control}
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
