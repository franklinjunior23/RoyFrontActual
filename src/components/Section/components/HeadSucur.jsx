import { useState } from "react";
import ModalCreate from "../../Modal/ModalCreate";

import Buttom from "@Components/Buttons/Buttom/Buttom";

function HeadSucur() {
  const [IsActiveMod, setIsActiveMod] = useState(false);
  function handleActiveModla() {
    setIsActiveMod(!IsActiveMod);
  }

  return (
    <div className="mt-6 lg:mt-12 lg:mb-4 flex justify-between items-center mb-4 dark:text-white">
      <div>
        <h4 className="text-base">Sucursales :</h4>
      </div>
      <div className=" relative">
        <Buttom
          className="bg-black px-3 py-2 text-white rounded-lg text-base"
          type="button"
          onClick={handleActiveModla}
        >
          + Crear Sucursal
        </Buttom>

        {IsActiveMod && (
          <ModalCreate funct={handleActiveModla} type={"CREATESUCURSAL"} />
        )}
      </div>
    </div>
  );
}
export default HeadSucur;
