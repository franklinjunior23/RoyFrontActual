import { Link } from "react-router-dom"


function LogoNav() {
  return (
    <section className="hidden lg:block bg-white dark:bg-transparent dark:text-white px-8 py-2 rounded-xl  ">
       <Link to={'/Dashboard'}>
        <div className="flex items-center ">
           <img
             src="https://www.intiscorp.com.pe/wp-content/uploads/2022/10/1-1-1.png"
             width={70}
             alt=""
             className="block mr-3"
           />
           <h2 className="text-lg uppercase font-medium">
             IntisCorp
           </h2>
           
        </div>
       </Link>
      </section>
  )
}

export default LogoNav