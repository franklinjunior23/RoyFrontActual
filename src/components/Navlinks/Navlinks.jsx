import { NavData } from "../../assets/DataDefault"
import ItemNav from "./components/ItemNav"

function Navlinks() {
  return (
   <section className="grid gap-4  mt-6 dark:text-white ">
    {
        NavData.map((dat,index)=>(
            <ItemNav key={index} datos={dat} />
        ))
    }
   </section>
  )
}
export default Navlinks