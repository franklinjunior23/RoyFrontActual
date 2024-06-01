import { Link, useNavigate, useParams } from "react-router-dom";
import { GetBsID } from "./action/Useknowledge";
import { toast } from "sonner";
import { useEffect } from "react";
import Header from "./components/Header";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/componentUI/ui/breadcrumb";
import FormCreate from "./components/FormCreate";
import { Skeleton } from "@/componentUI/ui/skeleton";


function FindKnowledge() {
  const navi = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = GetBsID();
  useEffect(() => {
    if (!isLoading) {
      if (data?.error) {
        toast.error("Documento no encontrado");
        return navi(
          { pathname: "/Dashboard/BaseConocimiento" },
          { replace: true }
        );
      }
    }
  }, [isLoading, data, navi]);
  return (
    <div>
      <Header>
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isLoading ? (
              <BreadcrumbPage>
                <Skeleton className="w-[80px] h-4" />
              </BreadcrumbPage>
            ) : (
              <BreadcrumbPage>{data?.data?.Titulo}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </BreadcrumbItem>
      </Header>
      <div>
        {isLoading ? <p>Cargando...</p> : <FormCreate data={data?.data} />}
      </div>
    </div>
  );
}

export default FindKnowledge;
