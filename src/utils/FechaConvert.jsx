import { DateTime } from "luxon";

export function formatDateToPeruvian(dateString) {
  const fechaPeruana = DateTime.fromISO(dateString).setZone("America/Lima");
  return fechaPeruana.toFormat("dd/MM");
}

export function formatTimeToPeruvian(dateString) {
  const horaPeruana = DateTime.fromISO(dateString).setZone('America/Lima');
  return horaPeruana.toFormat('HH:mm');
}
