import { LinksAdministratorData } from "@/assets/DataDefault"
import ItemNav from "./components/ItemNav"


function NavLinksAdmin() {
  return (
    <section className="grid gap-5 mb-10  h-full mt-5 dark:text-white ">
    {
        LinksAdministratorData.map((dat,index)=>(
            <ItemNav key={index} datos={dat} />
        ))
    }
   </section>
  )
}

export default NavLinksAdmin