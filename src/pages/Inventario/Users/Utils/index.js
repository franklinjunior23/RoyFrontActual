import PropTypes from "prop-types";

export function AddDataForm({ data, setValue }) {
  console.log(data);

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
    { value: "tipo_usuario", key: "tipo_usuario" },
    { value: "anydesk_contra", key: "anydesk_contra" },
    { value: "email", key: "email" },
    { value: "Areas[0]?.id", key: "IdArea" },
  ];

  Campos?.forEach((campo) => {
    const { key, value } = campo;

    // Suponiendo que el objeto 'data' tiene propiedades coincidentes
    const valor = value?.includes("[") ? eval(`data.${value}`) : data[value];
    if(valor === "undefined"){
      return  setValue(key, "");
    }
    setValue(key, valor);
  });
}

AddDataForm.propTypes = {
  data: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};
