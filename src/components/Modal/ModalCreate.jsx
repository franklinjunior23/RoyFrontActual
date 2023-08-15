
import FormCSucursal from "./components/FormCSucursal";
import FormCreate from "./components/FormCreate"

function ModalCreate({funct,type}) {

  const TypeModal = ()=>{
      switch (type) {
        case 'CREATEEMPRESA':
          return  <FormCreate handle={funct}/>;
        case 'CREATESUCURSAL':
          return <FormCSucursal handle={funct} />
 
      }
  }
  return (
    <aside className="absolute -bottom-[350px]  right-8 z-10  w-[270px] py-4 px-3 rounded-2xl bg-slate-800 lg:w-[300px] ">
      <TypeModal />
       
    </aside>
  )
}
export default ModalCreate