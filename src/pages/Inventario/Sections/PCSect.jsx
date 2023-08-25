import { useQuery } from "@tanstack/react-query";
import { GetDispositos } from "../../../services/ApiGets";
import ItemDisp from "./ItemDisp";

function PCSect() {
    const { data, isLoading, isError } = useQuery(["GetDisp"], GetDispositos);
    console.log(data)
  return (
    <main className="mt-5">
        <section className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {
                data?.filter((dat)=> dat.tipo ==='Pc').map((value)=>(
                    <ItemDisp value={value} key={value.id} />
                ))
            }

        </section>
      
    </main>
  )
}

export default PCSect
