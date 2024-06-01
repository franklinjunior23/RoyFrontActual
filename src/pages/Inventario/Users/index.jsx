
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetUserById } from "@Services/ApiGets";
import FormUser from "./components/Form";
function PageUser() {
  const { idUsuario } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["UserFind"],
    queryFn: () => GetUserById(idUsuario),
  });
  if (isLoading) return <h2>Cargando ...</h2>;
  return <main>
    <FormUser data={data.resp ?? []} /> 
  </main>;
}

export default PageUser;
