import { validateEmptyForm } from "@/utils/useform/validateEmpty";
import ErrrorInput from "@Components/Input/ErrrorInput";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import Option from "@Components/Input/Option";
import Select from "@Components/Input/Select";
import React from "react";
import { Controller } from "react-hook-form";

function FormAccespoint({ control, errors, watch }) {
  const typered = [
    "Router",
    "Switch",
    "Access Point",
    "Firewall",
    "Cableado Estructurado",
    "print server",
    "UPS",
    "Camara Analogica",
    "Camara IP",
    "DVR",
    "NVR",
    "Otros",
  ];
  const brandred = [
    "Cisco",
    "D-Link",
    "Linksys",
    "TP-Link",
    "Ubiquiti",
    "Tenda",
    "Mikrotik",
    "Huawei",
    "Zyxel",
    "Netgear",
    "TotoLink",
    "Mercusys",
    "Trendnet",
    "Tenda",
    "zte",
    "Otro",
    
  ];
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
                {typered?.map((typePc) => {
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
          defaultValue=""
          render={({ field }) => (
            <Label>
              Marca
              <Select {...field}>
                {brandred?.map((typePc) => {
                  return (
                    <Option value={typePc} key={typePc}>
                      {typePc}
                    </Option>
                  );
                })}
              </Select>
            </Label>
          )}
        />

        <Controller
          control={control}
          name="Config_ip"
          defaultValue=""
          render={({ field }) => (
            <Label>
              Ip
              <Input {...field} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Config_mac"
          defaultValue=""
          render={({ field }) => (
            <Label>
              mac .
              <Input {...field} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Config_user"
          defaultValue=""
          render={({ field }) => (
            <Label>
              User
              <Input {...field} />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="Config_contra"
          defaultValue=""
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

export default FormAccespoint;
