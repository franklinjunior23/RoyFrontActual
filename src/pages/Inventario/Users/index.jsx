import Form from "./components/Form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetUserById } from "@Services/ApiGets";
import { Suspense } from "react";
function PageUser() {
  const { nombreE, sucursalN, idUsuario } = useParams();

  var { data: DataUser,isLoading } = useQuery({
    queryKey: ["UserFind"],
    queryFn: () => GetUserById(idUsuario),
  });
  if(isLoading) return <h2>Cargando ...</h2>
  console.log(DataUser);
  return (
    <main>
      <Form data={DataUser?.resp ?? []} />
    </main>
  );
}

export default PageUser;
