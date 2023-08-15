import ItSection from "../../components/Navbar/components/ItSection";
import ItemSection from "../../components/Section/ItemSection";
import { UseContextLoged } from "../../context/AuhtLoged";

function Home() {
  const { LogedAuth } = UseContextLoged();
  return (
    <>
      <main className="">
        <header className="flex justify-between">
          <section>
            <h4 className="text-Slet text-lg font-bold">
              Bienvenido {LogedAuth.nombre}
            </h4>
            <p className="text-Chiqui">Domingo 06 de Agosto, 2023</p>
          </section>
          <ItSection dato={true} />
        </header>
        <ItemSection />
      </main>
    </>
  );
}
export default Home;
