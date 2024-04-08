import axiosInstance from "@/helpers/config/axios-instance";
import Switch from "@Components/Buttons/Buttom/Switch";
import Option from "@Components/Input/Option";
import Select from "@Components/Input/Select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

function LinkCreate({ control }) {
  const [UserAct, setUserAct] = useState(false);
  const [AreaAct, setAreaAct] = useState(false);
  return (
    <div className="bg-slate-400/30 rounded-lg mt-2 p-4">
      <h2 className="text-center font-semibold text-xl">Vincular</h2>
      <main className="grid grid-cols-2 text-center">
        <section>
          <h3>Usuario</h3>
          <Switch
            name="UserSelect"
            state={UserAct}
            onchange={() => setUserAct(!UserAct)}
            className=" bg-black/30"
          />
        </section>

        <section>
          <h3>Area</h3>
          <Switch
            name="AreaSelect"
            state={AreaAct}
            onchange={() => setAreaAct(!AreaAct)}
            className=" bg-black/30"
          />
        </section>
      </main>
      <SelectOption user={UserAct} area={AreaAct} control={control} />
    </div>
  );
}

export default LinkCreate;

LinkCreate.propTypes = {
  control: PropTypes.any,
};

function SelectOption({ user, area, control }) {
  const { nombreE, sucursalN } = useParams();
  const [dataArea, setDataArea] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get(
        `Areas?Company=${nombreE}&Branch=${sucursalN}`
      );
      const { data: dataUser } = await axiosInstance.get(
        `Users/Disp?empresa=${nombreE}&sucursal=${sucursalN}`
      );
      setDataArea(data?.body);
      setDataUser(dataUser);
    })();
  }, [nombreE, sucursalN]);
  if (user || area)
    return (
      <main className="mt-5">
        <Controller
          name="Share.type"
          
          defaultValue={area ? "Area" : user ? "User" : ""}
          control={control}
          render={({ field: { name } }) => {
            return (
              <input type="text" name={name} value={area ? "Area":'user'} hidden />
            );
          }}
        />
        <Controller
          name="Share.id"
          control={control}
          render={({ field: { name, value, onChange } }) => {
            return (
              <Select
                name={name}
                value={value}
                onChange={onChange}
                options={dataArea}
                placeholder="Selecciona un area"
              >
                {area &&
                  dataArea?.map((area) => {
                    return (
                      <Option value={area.id} key={area.id}>
                        {area.name}
                      </Option>
                    );
                  })}
                {user &&
                  dataUser?.map((user) => {
                    return (
                      <Option value={user?.id} key={user?.id}>
                        {user?.nombre} {user?.apellido}
                      </Option>
                    );
                  })}
              </Select>
            );
          }}
        />
      </main>
    );
}
SelectOption.propTypes = {
  user: PropTypes.bool,
  area: PropTypes.bool,
  control: PropTypes.any,
};
