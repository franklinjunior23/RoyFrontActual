
import ItSection from "../Navbar/components/ItSection";
import ListEmpresas from "./components/ListEmpresas";

function ItemSection({LinkDate}) {
  

  return (
    <section className="py-4 mt-5 md:mt-0">
      <header className=" flex  lg:hidden justify-between items-center mb-6">
        <div>
          <h3 className="text-Slet font-bold text-xl">Empresas</h3>
        </div>
        <ItSection />
      </header>
      <ListEmpresas LinkDate={LinkDate}/>
    </section>
  );
}

export default ItemSection;
