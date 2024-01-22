import Form from "./components/Form";
import { useParams } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
import { GetUserById } from "@Services/ApiGets";
import { Suspense } from "react";
function PageUser() {
  const { nombreE, sucursalN, idUsuario } = useParams();

  var { data: DataUser } = useQuery({
    queryKey: ["UserFind"],
    queryFn: () => GetUserById(idUsuario),
  });

  return (
    <main>
      <Suspense fallback={<h2>Cargando</h2>} key={DataUser?.resp?.id}>
        <Form data={DataUser?.resp ?? []}/>
      </Suspense>
    </main>
  );
}

export default PageUser;
