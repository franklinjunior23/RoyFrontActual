import { useState } from "react";
import PropTypes from "prop-types";
import { Drawer } from "vaul";
import { IconX } from "@tabler/icons-react";

function ModalTotal({ title, className, icon, Content ,titleModal }) {
  const [ActiveModal, setActiveModal] = useState(false);

  function handleActive() {
    setActiveModal(!ActiveModal);
  }
 
  return (
    <>
      <section className="w-full ">
        <button className={`${className} hidden lg:flex`} type="button" onClick={handleActive}>
          {title} {icon}
        </button>
        <div className="lg:hidden">
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <button className={`${className}`} type="button" >{title} {icon}</button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="dark:bg-DarkComponent flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white  dark:bg-DarkFondo rounded-t-[10px] flex-1">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8 " />
                  <div className="max-w-md mx-auto">
                    <Drawer.Title className="font-medium mb-4 text-center dark:text-white">
                     {titleModal}
                    </Drawer.Title>
                    {Content}
                  </div>
                </div>
                <div className=" dark:bg-DarkFondo"></div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </section>
      {ActiveModal && (
        <main
          className={`hidden lg:grid  fixed w-full h-screen  bg-black/40 top-0 left-0 z-40 ${
            ActiveModal ? "block" : "hidden"
          } grid place-content-center `}
        >
         
          <article className="dark:bg-DarkComponent py-8 px-10 rounded-lg w-[850px] bg-white shadow-lg relative">
          <div className="absolute top-4 right-4"> <IconX className="dark:text-white cursor-pointer " size={30} onClick={handleActive}/> </div>
            <h3 className="text-center uppercase text-2xl  mb-8 dark:text-white">{titleModal}</h3>
            {Content}
          </article>
        </main>
      )}
    </>
  );
}
export default ModalTotal;

ModalTotal.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  Content: PropTypes.element.isRequired,
  titleModal: PropTypes.string.isRequired,
};

function ButtonForm(FunctionEvente) {
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        type="submit"
        
        onClick={FunctionEvente}
      >
        Enviar
      </button>
      <button
      className="bg-blue-500/400 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      type="submit"
      onClick={FunctionEvente}
      >
        Cancelar
      </button>
    </>
  );
}