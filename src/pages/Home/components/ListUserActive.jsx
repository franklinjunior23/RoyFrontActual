import { UseContextLoged } from "../../../context/AuhtLoged";
import { DataListDashboard } from "../../../store/Dashboard/DataDash";

function ListUserActive() {
  const { DataList } = DataListDashboard();
  const { LogedAuth } = UseContextLoged();
  console.log(LogedAuth);
  if (!DataList) return <h2>Cargando...</h2>;

  return (
    <main>
      <h2>Lista de Usuarios Activos</h2>
      <ul>
        {DataList?.ListUsers?.filter(
          (item) => item.nombre !== LogedAuth.nombre
        ).map((item) => (
          <section key={item.nombre} className="bg-DarkComponent p-3 rounded-lg">
            {item.nombre}
            {item.isActive ? " - Active" : ` - Last Updated: ${item.updatedAt}`}
          </section>
        ))}
      </ul>
    </main>
  );
}

export default ListUserActive;
