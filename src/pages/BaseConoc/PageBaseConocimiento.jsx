import { useState } from "react"
import Header from "./Components/Header"
import ListContent from "./Components/ListContent";

// pagina inicial de la base de conocimiento
function PageBaseConocimiento() {
  // estado para la busqueda de articulos en la base de conocimiento 
  const [Search, setSearch] = useState("");
  
  return (
    <main>
      <Header setValue={setSearch}  Value={Search}/>
      <ListContent/>
    </main>
  )
}

export default PageBaseConocimiento
