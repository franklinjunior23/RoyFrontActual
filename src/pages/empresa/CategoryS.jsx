import { Outlet } from "react-router-dom"
import ListCategoy from "../../components/Section/components/ListCategoy"

function CategoryS() {
  return (
    <section>
       <div className="mb-4 md:mb-6 ">
         <ListCategoy/>
       </div>
        <Outlet/>
    </section>
  )
}
export default CategoryS