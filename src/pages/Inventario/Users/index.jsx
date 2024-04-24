import Form from "./components/Form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetUserById } from "@Services/ApiGets";
function PageUser() {
  const {  idUsuario } = useParams();

  const { data,isLoading } = useQuery({
    queryKey: ["UserFind"],
    queryFn: () => GetUserById(idUsuario),
  });
  
  if(isLoading) return <h2>Cargando ...</h2>
  console.log(data)
  return (
    <main>
      <Form data={data.resp ?? []} />
    </main>
  );
}

export default PageUser;