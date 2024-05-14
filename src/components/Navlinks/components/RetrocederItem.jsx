import Buttom from "@Components/Buttons/Buttom/Buttom";
import { IconCaretLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/componentUI/ui/breadcrumb";
function RetrocederItem() {
  const { nombreE, sucursalN } = useParams();
  const navi = useNavigate();
  const { pathname } = useLocation();
  const newPath = pathname.split("/");
  return (
    <section className="flex items-center justify-between mb-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/Dashboard"}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Empresa</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {nombreE | !sucursalN ? (
              <BreadcrumbItem>
                <BreadcrumbLink>{nombreE}</BreadcrumbLink>
              </BreadcrumbItem>
            ) : null}

            {sucursalN && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to={`/Dashboard/Home/${nombreE}`}>{nombreE}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{sucursalN}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        {newPath[newPath?.length - 1] != "summary" && newPath.length < 7 && (
          <Buttom
            className="flex items-center gap-1 pr-4.5"
            onClick={() => navi(newPath.slice(0, -1).join("/"))}
          >
            <IconCaretLeft color="white" size={20} />
            Regresar
          </Buttom>
        )}
      </div>
    </section>
  );
}

export default RetrocederItem;
