
import Hardware from "../Fields-pc-laptop-servidor/Hardware";
import History from "../Fields-pc-laptop-servidor/History";
import Software from "../Fields-pc-laptop-servidor/Software";
import Summary from "../Fields-pc-laptop-servidor/Summary";

export const DataFieldsBandle = [
  { label: "Resumen", value: "summary", pageContent: <Summary /> },
  { label: "Editar", value: "edit", pageContent:null },
  { label: "Hardware", value: "hardware", pageContent: <Hardware/> },
  { label: "Software", value: "software", pageContent: <Software/> },
  {
    label: "Historial",
    value: "history-device",
    pageContent: <History/>,
  },
  {label:'Soporte',value:'support',pageContent:<h3>Lista de Soporte de este dispositivo</h3>},
  { label: "Acciones", value: "actions", pageContent: <h3>Acciones</h3> },
];
