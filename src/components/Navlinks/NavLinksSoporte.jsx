import { NavData } from "@/assets/DataDefault"
import ItemNav from "./components/ItemNav"

function NavLinksSoporte() {
  return (
   <section className="grid gap-4  mt-5 dark:text-white ">
    {
        NavData.map((dat,index)=>(
            <ItemNav key={index} datos={dat} />
        ))
    }
   </section>
  )
}
export default NavLinksSoporte