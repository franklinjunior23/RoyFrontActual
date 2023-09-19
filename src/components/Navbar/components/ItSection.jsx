import { useState } from "react";
import ModalCreate from "../../Modal/ModalCreate";
import { IconSearch } from "@tabler/icons-react";

function ItSection({ dato }) {
 
  const [ActiveModalCreat, setActiveModalCreat] = useState(false);
  const handleActive = () => {
    setActiveModalCreat(!ActiveModalCreat);
  };
  
  return (
    <div className={`${dato ==true ? ' hidden md:flex gap-2 relative ' :"gap-2 flex relative"}`}>
      <button className="px-2 py-2 lg:px-4 bg-[#F3F3F3] rounded-md">
        <IconSearch/>
      </button>
      <button
        className="px-4 py-3  lg:py-2 lg:px-4 bg-black bg-black/80 dark:font-semibold rounded-lg text-white text-xs lg:text-base"
        onClick={handleActive}
      >
        Crear Empresa
      </button>
      {ActiveModalCreat && <ModalCreate type={'CREATEEMPRESA'} funct={handleActive} />}
    </div>
  );
}
export default ItSection;
