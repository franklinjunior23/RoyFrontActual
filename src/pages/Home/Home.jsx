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
            <h4 className="text-Slet text-lg font-bold">
              Bienvenido {LogedAuth.nombre}
            </h4>
            <p className="text-Chiqui capitalize">{Format}</p>
          </section>
          <ItSection dato={true} />
        </header>
        <ItemSection />
      </main>
    </>
  );
}
export default Home;
