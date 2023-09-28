import { DateTime } from "luxon";

export function formatDateToPeruvian(dateString) {
  const fechaPeruana = DateTime.fromISO(dateString).setZone("America/Lima");
  return fechaPeruana.toFormat("dd/MM");
}
