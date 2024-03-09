import FormCSucursal from "./components/FormCSucursal";
import FormCUser from "./components/FormCUser";
import FormCreate from "./components/FormCreate";

function ModalCreate({ funct, type }) {
  const TypeModal = () => {
    switch (type) {
      case "CREATEEMPRESA":
        return <FormCreate handle={funct} />;
      case "CREATESUCURSAL":
        return <FormCSucursal handle={funct} />;
      case "CREATEUSER":
        return <FormCUser handle={funct} />;
    }
  };
  return (
    <aside className="absolute top-16 right-8 z-10  w-[270px] py-4 px-3 rounded-2xl bg-slate-800 lg:w-[300px] ">
      <TypeModal />
    </aside>
  );
}
export default ModalCreate;
