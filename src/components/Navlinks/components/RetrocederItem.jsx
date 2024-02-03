import Buttom from "@Components/Buttons/Buttom/Buttom";
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
        <Buttom
        className="flex items-center gap-1 pr-4.5"
        onClick={() => navi(-1)}>
          <IconCaretLeft color="white" size={20} />
          Regresar
        </Buttom>
      </div>
    </section>
  );
}

export default RetrocederItem;
