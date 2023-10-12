import { IconCaretLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";


function RetrocederItem() {
  const navi = useNavigate();


  return (
    <section className="flex justify-between items-center mb-6">
      <div>
        <span className=""></span>
      </div>
      <div>
        <button
        type="button"
          className="pl-2 pr-4 text-white text-base rounded-md lg:text-lg bg-black py-1 flex items-center gap-1"
          onClick={() => navi(-1)}
        >
          <IconCaretLeft/>
          Regresar
        </button>
      </div>
    </section>
  );
}

export default RetrocederItem;