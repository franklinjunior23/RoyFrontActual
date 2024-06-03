import { LinksAdministratorData, NavData } from "@/assets/DataDefault";
import ItemNav from "./components/ItemNav";
import { IconBrandTidal } from "@tabler/icons-react";

function NavLinks({ Rol }) {
  try {
    const TypesNav = [
      { name: "Soporte", data: NavData },
      { name: "Administrador", data: LinksAdministratorData },
      {name:"Visitante",data:LinksAdministratorData},
    ];

    const LinksUrl = TypesNav.find((nav) => nav.name === Rol);

    if (!LinksUrl) {
      throw new Error(`No se encontraron enlaces para el rol: ${Rol}`);
    }

    return (
      <section className="grid gap-2 mt-2 dark:text-white ">
        {LinksUrl?.data?.map((dat, index) => (
          <ItemNav key={index} datos={dat} />
        ))}
        <div
          className={`transition-all ease-in-out hover:duration-300  flex gap-5`}
        >
          <a
            href="https://drive.google.com/drive/u/1/folders/1zU_lZRimfLAkyaiPc-gsfhxVHNA_8MCb"
            target="_blank"
            className="py-2.5 w-full flex gap-3 rounded-lg hover:bg-white/20  dark:hover:bg-white/20  px-4  items-center"
            rel="noreferrer"
          >
            <span className="text-xl">
              <IconBrandTidal size={28} />
            </span>
            <h3 className="text-sm">Agente</h3>
          </a>
        </div>
      </section>
    );
  } catch (error) {
    console.error(error);
    // Aquí puedes mostrar un mensaje de error al usuario o redirigir a la página de inicio de sesión.
    return <p>Ocurrió un error. Vuelve a iniciar sesión.</p>;
  }
}

export default NavLinks;
