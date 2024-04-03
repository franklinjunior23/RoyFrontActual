import Button from "@Components/Input/Button";
import { IconUser } from "@tabler/icons-react";
import { Switch } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Optiondevice({  watch }) {
  const [idUser, setidUser] = useState(undefined);
  const [AreaData, setAreaData] = useState(undefined);
  const dataUser = watch("User");

  useEffect(() => {
    (() => {
      setidUser(watch("IdUser"));
      setAreaData(watch("Area"));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("IdUser"), watch("Area")]);



  return (
    <div className="bg-slate-400/30 p-4 rounded-lg mt-2">
      <h2 className="text-center font-semibold text-xl">Vincular</h2>
      <main className="grid grid-cols-2 text-center">
        <section>
          <h3>Usuario</h3>
          <Switch checked={idUser ?? false} className=" bg-black/30" />
        </section>

        <section>
          <h3>Area</h3>
          <Switch checked={AreaData?.length===0 ??false} className=" bg-black/30" />
        </section>
      </main>
      <main>
        {AreaData &&
          AreaData.map((area) => {
            return (
              <section
                key={area.name}
                className=" max-w-[330px] p-2 mt-4 bg-white rounded-lg text-sm text-black"
              >
                <h3>Area: {area.name} </h3>

               
                  <Button type="button" variant="danger">
                    Desvincular
                  </Button>
                
              </section>
            );
          })}

        {idUser && (
          <section className=" max-w-[330px] p-2 mt-4 bg-white rounded-lg text-sm text-black">
            <IconUser className="mx-auto my-3" size={40} />
            <h3 className="capitalize">
              <span className="font-bold"> Nombre: </span> {dataUser?.nombre}{" "}
              {dataUser?.apellido}
            </h3>
            <h3 className="capitalize">
              <span className="font-bold">Cargo:</span>{" "}
              {String(dataUser?.cargo).toLowerCase()}
            </h3>
            <h3>
              {" "}
              <span className="font-bold">Usuario:</span> {dataUser.usuario}
            </h3>
            <h3>
              {" "}
              <span className="font-bold">Contraseña:</span>{" "}
              {dataUser.contraseña}
            </h3>

            <footer className="mt-4 grid grid-cols-2 gap-2">
              <Button type="button" variant="danger">
                Desvincular
              </Button>
              <Button variant="second">Ver</Button>
            </footer>
          </section>
        )}
      </main>
    </div>
  );
}

export default Optiondevice;

Optiondevice.propTypes = {
  control: PropTypes.any,
  watch: PropTypes.any,
};
