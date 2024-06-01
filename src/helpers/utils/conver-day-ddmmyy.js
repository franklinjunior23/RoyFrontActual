import { DateTime } from "luxon";

export function FormateDayD(dateString) {
  const fechaPeruana = DateTime.fromISO(dateString).setZone("America/Lima");
  return fechaPeruana.toFormat("dd/MM/yy");
}

export function FormateDay(dateString) {
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
export function TimeFormated(dateString) {
  const date = new Date(dateString);

  const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = date.toLocaleDateString('es-ES', optionsDate);
  const formattedTime = date.toLocaleTimeString('es-ES', optionsTime);

  return `${formattedDate} - ${formattedTime}`;
}