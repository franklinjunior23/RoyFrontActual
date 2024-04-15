import Buttom from "@Components/Buttons/Buttom/Buttom";
import { IconCaretLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function RetrocederItem() {
  const navi = useNavigate();
  const { pathname } = useLocation();
  const newPath = pathname.split("/");
  return (
    <section className="flex items-center justify-between mb-4">
      <div>
        <span className=""></span>
      </div>
      <div>
        {newPath[newPath?.length - 1] != "summary" && newPath.length<7 && (
          <Buttom
            className="flex items-center gap-1 pr-4.5"
            onClick={() => navi(newPath.slice(0, -1).join("/"))}
          >
            <IconCaretLeft color="white" size={20} />
            Regresar
          </Buttom>
        ) }
      </div>
    </section>
  );
}

export default RetrocederItem;
