import { useState } from "react";
import Header from "./Components/Header";
import ListBC from "./Components/ListBC";
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetsBaseConocimiento } from "../../services/ApiGets";
import ReactQuill from "react-quill";

function PageBC() {
  const [Search, setSearch] = useState("");
  const [WriteUser, setWriteUser] = useState('<h1><span class="ql-size-huge">PUTAAA</span></h1>');
  const {data,isLoading,isError} = useQuery({
    queryFn:GetsBaseConocimiento,
    queryKey:['BaseConocimiento']
  })
  const modules={
    toolbar: [
      [{ header: [1, 2,3,4, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
    
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
     
    ],
  }
console.log(data)
  const {id}=useParams();
  if(isLoading) return <div>Cargando...</div>
  if(isError) return <div>Error</div>
  return (
    <main>
      <Header setValue={setSearch} Value={Search} />
      <article className="flex flex-col md:flex-row justify-between gap-4 mt-5 h-[400px]">
        <ListBC List={data.data} />
        <section className="bg-white w-full px-2 h-full ">
            <Outlet/>
       
        </section>
      </article>
      <h3 className="dark:text-white">{WriteUser} {Search}</h3>
    </main>
  );
}
export default PageBC;
