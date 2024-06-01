import { useState } from "react";
import ModalCreate from "../../Modal/ModalCreate";

import Buttom from "@Components/Buttons/Buttom/Buttom";

function HeadSucur() {
  const [IsActiveMod, setIsActiveMod] = useState(false);
  function handleActiveModla() {
    setIsActiveMod(!IsActiveMod);
  }

  return (
    <>
      <Buttom
        className="px-3 py-2 text-base text-white bg-black rounded-lg"
        type="button"
        onClick={handleActiveModla}
      >
        + Crear Sucursal
      </Buttom>

      {IsActiveMod && (
        <ModalCreate funct={handleActiveModla} type={"CREATESUCURSAL"} />
      )}
    </>
  );
}
export default HeadSucur;
