export const filtrarDatos = (empresa, sucursal, tipo,data) => {
  // Encontrar la empresa seleccionada
  const empresaSeleccionada = data.find((e) => e.nombre === empresa);

  // Encontrar la sucursal seleccionada en la empresa
  const sucursalSeleccionada =
    empresaSeleccionada?.Sucursales.find((s) => s.nombre === sucursal) || {};

  // Obtener los datos específicos según el tipo seleccionado (Users o Dispositivos)
  const datosFiltrados = sucursalSeleccionada[tipo] || [];

  return datosFiltrados;
};

