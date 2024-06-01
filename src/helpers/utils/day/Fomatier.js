import { DateTime } from "luxon";

export function FormatierDay(day) {
  const dat = new Date(day);
  return dat.toLocaleDateString("es-Es", {
    timeZone: "Europe/Madrid",
  });
}
