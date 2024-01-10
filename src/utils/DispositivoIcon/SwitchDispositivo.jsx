import { IconAccessPoint, IconDeviceLaptop, IconDevicesPc, IconPrinter } from "@tabler/icons-react";

export const SwitchIconDisp = ({ data, size }) => {
    switch (data) {
      case "Pc":
        return <IconDevicesPc width={size} height={size} strokeWidth={1.5} />;
      case "Laptop":
        return <IconDeviceLaptop width={size} height={size} />;
      case "Servidores":
        return <IconDevicesPc width={size} height={size} />;
      case "Red":
        return <IconAccessPoint width={size} height={size} />;
      case "Impresora":
        return <IconPrinter width={size} height={size} />;
    }
  };