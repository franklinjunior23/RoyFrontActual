import { LinksAdministratorData, NavData } from "@/assets/DataDefault";
import ItemNav from "./components/ItemNav";
import { IconBrandTidal } from "@tabler/icons-react";

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
      <section className="grid gap-2 mt-2 dark:text-white ">
        {LinksUrl?.data?.map((dat, index) => (
          <ItemNav key={index} datos={dat} />
        ))}
        <ItemNav
          datos={{
            name: "Agente",
            url: "/",
            icon: <IconBrandTidal size={28} />,
            type: "link",
            funct: () => {
              const zipUrl =
                "https://drive.google.com/drive/u/1/folders/1zU_lZRimfLAkyaiPc-gsfhxVHNA_8MCb";

              // Crear un enlace dinámicamente
              const link = document.createElement("a");
              link.href = zipUrl;
              link.target = "_blank";

              // Simular un clic en el enlace para iniciar la descarga del archivo
              document.body.appendChild(link);
              link.click();

              // Limpiar el enlace
              document.body.removeChild(link);
            },
          }}
        />
      </section>
    );
  } catch (error) {
    console.error(error);
    // Aquí puedes mostrar un mensaje de error al usuario o redirigir a la página de inicio de sesión.
    return <p>Ocurrió un error. Vuelve a iniciar sesión.</p>;
  }
}

export default NavLinks;
