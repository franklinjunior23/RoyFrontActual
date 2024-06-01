import Button from "@Components/Input/Button";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import { IconDeviceDesktop } from "@tabler/icons-react";

function PeripheralsForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      display: [{ name: "", brand: "" }],
      mouse: [{ name: "", brand: "" }],
      keyboard: [{ name: "", brand: "" }],
    },
  });
  // FieldsDisplay
  const {
    fields: DisplayFields,
    append: AppendDisplay,
    remove: RemoveDisplay,
  } = useFieldArray({
    name: "display",
    control,
  });
  // end FieldsDisplay

  // FieldsMouse
  const {
    fields: MouseFields,
    remove: RemoveMouse,
    append: AppendMouse,
  } = useFieldArray({
    name: "mouse",
    control,
  });
  // end FieldsMouse

  // FieldsKeyboard
  const {
    fields: KeyboardFields,
    remove: RemoveKeyboard,
    append: AppendKeyboard,
  } = useFieldArray({
    name: "keyboard",
    control,
  });
  // end FieldsKeyboard

  function Submit(data) {
    console.log(data);
    console.log(FieldsContent.length);
  }
  return (
    <main>
      <form onSubmit={handleSubmit(Submit)}>
        <section>
          <h3>Monitor</h3>

          <section className="grid md:grid-cols-4 gap-3 mt-3">
            {DisplayFields.map((field, index) => (
              <FieldsContent
                name="display"
                key={field.id}
                control={control}
                index={index}
                remove={RemoveDisplay}
                fields={[
                  { label: "Nombre", name: "name" },
                  { label: "Marca", name: "brand" },
                  { label: "Serial", name: "serial" },
                ]}
              />
            ))}
            {DisplayFields.length <= 3 && (
              <Button
                onClick={() =>
                  AppendDisplay({ name: "", brand: "", serial: "" })
                }
              >
                Agregar Monitor
              </Button>
            )}
          </section>
        </section>
        <main className="grid md:grid-cols-2 mt-4 gap-5">
          <section className="">
            <h3>Mouse</h3>
            <section className="grid grid-cols-3 gap-3 mt-3">
              {MouseFields.map((field, index) => (
                <FieldsContent
                  name="mouse"
                  key={field.id}
                  control={control}
                  index={index}
                  remove={RemoveMouse}
                  fields={[
                    { label: "Nombre", name: "name" },
                    { label: "Marca", name: "brand" },
                    { label: "Serial", name: "serial" },
                  ]}
                />
              ))}
              {MouseFields.length <= 2 && (
                <Button
                  onClick={() =>
                    AppendMouse({ name: "", brand: "", serial: "" })
                  }
                >
                  Agregar Mouse
                </Button>
              )}
            </section>
            <section className="mt-5 flex gap-2">
              <Button>Guardar Cambios</Button>
              <Button variant="second">Cancelar </Button>
            </section>
          </section>
          <section className="">
            <h3>Teclado</h3>
            <section className="grid grid-cols-3 gap-3 mt-3">
              {KeyboardFields.map((field, index) => (
                <FieldsContent
                  name="keyboard"
                  key={field.id}
                  control={control}
                  index={index}
                  remove={RemoveKeyboard}
                  fields={[
                    { label: "Nombre", name: "name" },
                    { label: "Marca", name: "brand" },
                    { label: "Serial", name: "serial" },
                  ]}
                />
              ))}
              {KeyboardFields.length <= 2 && (
                <Button
                  onClick={() =>
                    AppendKeyboard({ name: "", brand: "", serial: "" })
                  }
                >
                  Agregar Teclado
                </Button>
              )}
            </section>
          </section>
        </main>
      </form>
    </main>
  );
}

export default PeripheralsForm;

function FieldsContent({ fields, control, index, remove, name }) {
  return (
    <div className="border grid gap-0.5 rounded-md p-3 py-4 border-white/20">
      {fields.map((fields) => (
        <Controller
          key={fields.label}
          control={control}
          name={`${name}.${index}.${fields.name}`}
          defaultValue={""}
          render={({ field }) => (
            <Label>
              {fields.label}
              <Input {...field} placeholder={`${name} ${fields.label}`} />
            </Label>
          )}
        />
      ))}
      <Button variant="danger" className="mt-2" onClick={() => remove(index)}>
        Eliminar
      </Button>
    </div>
  );
}

FieldsContent.propTypes = {
  fields: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  remove: PropTypes.func,
  name: PropTypes.string,
};

/**
 * function ItemMonitor({}) {
  return (
    <div className="border p-2 rounded-md w-[270px]">
      <IconDeviceDesktop />
    </div>
  );
}
 * 
 * 
 */
