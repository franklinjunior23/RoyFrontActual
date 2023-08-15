import { NavData } from "../../assets/DataDefault"
import ItemNav from "./components/ItemNav"

function Navlinks() {
  return (
   <section className="grid place-content-center mt-12">
    {
        NavData.map((dat,index)=>(
            <ItemNav key={index} datos={dat} />
        ))
    }
   </section>
  )
}
export default Navlinks