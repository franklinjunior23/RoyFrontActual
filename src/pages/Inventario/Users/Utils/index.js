import PropTypes from "prop-types";
export function AddDataForm({ data, setValue }) {
  Campos.forEach((campo) => {
    const { key, value } = campo;
    const valor = data[value]; // Suponiendo que el objeto 'data' tiene propiedades coincidentes
    setValue(key, valor);
  });
}
AddDataForm.propTypes = {
  data: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
};
const Campos = [
  { value: "nombre", key: "nombre" },
  { value: "apellido", key: "apellido" },
  { value: "cargo", key: "cargo" },
  { value: "genero", key: "genero" },
  { value: "tipo_doc", key: "tipo_doc" },
  { value: "doc", key: "doc" },
  { value: "estado", key: "estado" },
  { value: "nivel_red", key: "nivel_red" },
  { value: "usuario", key: "usuario" },
  { value: "contraseña", key: "contraseña" },
  { value: "anydesk_id", key: "anydesk_id" },
  { value: "anydesk_contra", key: "anydesk_contra" },
  { value: "Email", key: "Email" },
];
