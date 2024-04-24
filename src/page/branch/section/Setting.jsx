import Switch from "@Components/Buttons/Buttom/Switch";
import Button from "@Components/Input/Button";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function Setting() {
  const [VisitedStatus, setVisitedStatus] = useState(false);
  const [SLAstatus, setSLAstatus] = useState(false);
  const { control, handleSubmit } = useForm();
  return (
    <main>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex gap-2">
          <Controller
            name="visits_status"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Label>
                <>Visitas Tecnicas</>
                <Switch
                  {...field}
                  state={VisitedStatus}
                  onchange={setVisitedStatus}
                />
              </Label>
            )}
          />
          {VisitedStatus && (
            <>
              <Controller
                name="visits_count"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Label>
                    <>Visitas</>
                    <Input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      {...field}
                    />
                  </Label>
                )}
              />
            </>
          )}
        </div>
        <div>
          <Controller
            name="sla_status"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Label>
                <>SLA</>
                <Switch
                  {...field}
                  state={SLAstatus}
                  onchange={setSLAstatus}
                />
              </Label>
            )}
          />
          {SLAstatus && (
            <>
              <Controller
                name="sla_time"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Label>
                    <>Tiempo de respuesta</>
                    <Input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      {...field}
                    />
                  </Label>
                )}
              />
            </>
          )}
        </div>
        <footer className="mt-5">
            <Button type="submit">
                Guardar Cambios
                
            </Button>
        </footer>
      </form>
    </main>
  );
}

export default Setting;
