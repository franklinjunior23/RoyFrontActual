import { Link } from "react-router-dom"

function ListBC({List}) {
  return (
    <section className="dark:bg-ChilComponn px-1 h-full overflow-y-scroll custom-scrollbar pr-3 w-[400px]">
        <main className="grid gap-2">
            {
                List.map(value=>(
                    <section key={value.id} className="bg-slate-300 py-3 rounded-md px-2">
                        
                        <Link to={value.id}>{value?.Autor}</Link> </section>
                ))
            }
           
        </main>
        
    </section>
  )
}
export default ListBC