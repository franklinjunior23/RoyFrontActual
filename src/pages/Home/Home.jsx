
import ItSection from "../../components/Navbar/components/ItSection";
import ItemSection from "../../components/Section/ItemSection";
import { UseContextLoged } from "../../context/AuhtLoged";

function formatDate(date) {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('es-PE', options);
}


function Home() {
  const { LogedAuth } = UseContextLoged();
  const today = new Date();
  const Format = formatDate(today);

  return (
    <>
      <main className="">
        <header className="flex justify-between">
          <section>
            <h4 className="text-Slet text-2xl font-bold capitalize">
              Bienvenido {LogedAuth.nombre}
            </h4>
            <p className="text-Chiqui capitalize dark:text-white pb-2 mt-1 border-b xl:w-[600px]">{Format}</p>
          </section>
         
           <div className="self-end">
             <ItSection dato={true} />
           </div>
          
        </header>
        <ItemSection />
      </main>
    </>
  );
}
export default Home;
