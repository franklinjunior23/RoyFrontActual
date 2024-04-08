export function pathnameNav({ path, quantity, newPath }) {
  // Dividir la cadena en segmentos separados por '/'
  const segmentos = path.split("/");

  // Eliminar la cantidad especificada de segmentos desde el final del array
  const nuevoPath = segmentos.slice(0, -quantity).join("/");

  return `${nuevoPath}${newPath}`;
}
