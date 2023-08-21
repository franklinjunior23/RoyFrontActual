
import {  useParams } from "react-router-dom";

import FormUser from "./components/FormUser";

function PageUsusuario() {
  const { idUsuario } = useParams();
  
  return (
    <FormUser id={idUsuario}/>
  );
}
export default PageUsusuario;
