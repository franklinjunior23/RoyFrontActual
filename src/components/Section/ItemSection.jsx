import Buttom from "@Components/Buttons/Buttom/Buttom";
import ItSection from "../Navbar/components/ItSection";
import ListEmpresas from "./components/ListEmpresas";
import { useState } from "react";
import ModalCreate from "@Components/Modal/ModalCreate";

function ItemSection({ LinkDate }) {
  const [ActiveModal, setActiveModal] = useState(false);

  return (
    <section className="py-4 mt-5 md:mt-0">
      <header className=" flex  lg:hidden justify-between items-center mb-6">
        <div>
          <h3 className="text-Slet font-bold text-xl">Empresas</h3>
        </div>
        <ItSection />
      </header>

      <main ondr>
        <header className="relative">
          <Buttom
            onClick={() => setActiveModal(!ActiveModal)}
            label="Crear Empresa"
          />
          {ActiveModal && (
            <ModalCreate
              type={"CREATEEMPRESA"}
              funct={() => setActiveModal(!ActiveModal)}
            />
          )}
        </header>
        <ListEmpresas LinkDate={LinkDate} />
      </main>
    </section>
  );
}

export default ItemSection;
