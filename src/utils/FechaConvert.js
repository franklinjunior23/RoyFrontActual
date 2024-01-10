import { DateTime } from "luxon";

export function formatDateToPeruvian(dateString) {
  const fechaPeruana = DateTime.fromISO(dateString).setZone("America/Lima");
  return fechaPeruana.toFormat("dd/MM/yy");
}

export function formatTimeToPeruvian(dateString) {
  const horaPeruana = DateTime.fromISO(dateString).setZone("America/Lima");
  return horaPeruana.toFormat("HH:mm");
}
export function TimeFromPeruvian(dateString) {
  const fechaPeruana = DateTime.fromISO(dateString).setZone("America/Lima");

  // Formato personalizado para incluir día, fecha, año y hora
  const formatoPersonalizado = " dd LLL yyyy - HH:mm";

  // Obtener la representación en español directamente
  const fechaFormateada = fechaPeruana
    .setLocale("es")
    .toFormat(formatoPersonalizado);

  return fechaFormateada;
}
