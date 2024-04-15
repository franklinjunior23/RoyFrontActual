import { IconClock, IconVirus, IconVirusOff } from "@tabler/icons-react";
import { IconClockX } from "@tabler/icons-react";

export function ClockStatus(status) {
  return StatusCLock.filter((value) => value.enabled === status)[0].icon;
}
export const StatusCLock = [
  { enabled: false, icon: <IconClockX size={35} /> },
  { enabled: true, icon: <IconClock  size={35}/> },
];

export const StatusAntivirus={
  true:<IconVirus size={35}/>,
  false:<IconVirusOff size={35} className="text-red-500"/>
}
