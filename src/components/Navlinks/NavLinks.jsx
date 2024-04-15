import { LinksAdministratorData, NavData } from "@/assets/DataDefault";
import ItemNav from "./components/ItemNav";

function NavLinks({ Rol }) {
  try {
    const TypesNav = [
      { name: "Soporte", data: NavData },
      { name: "Administrador", data: LinksAdministratorData },
      // {name:"Visitante",data:LinksAdministratorData},
    ];

    const LinksUrl = TypesNav.find((nav) => nav.name === Rol);

    if (!LinksUrl) {
      throw new Error(`No se encontraron enlaces para el rol: ${Rol}`);
    }

    return (
      <section className="grid gap-2    mt-2 dark:text-white ">
        {LinksUrl.data?.map((dat, index) => (
          <ItemNav key={index} datos={dat} />
        ))}
      </section>
    );
  } catch (error) {
    console.error(error);
    // Aquí puedes mostrar un mensaje de error al usuario o redirigir a la página de inicio de sesión.
    return <p>Ocurrió un error. Vuelve a iniciar sesión.</p>;
  }
}

export default NavLinks;
