
import { UsecontextAuth } from "@/context/provider-auth";

export function AvatarImg({ name, lastName }) {
  return `https://ui-avatars.com/api/?name=${name}+${lastName}`;
}
export function MyAvatar() {
  const { LogedAuth } = UsecontextAuth();
  return AvatarImg({
    name: LogedAuth?.nombre,
    lastName: LogedAuth?.apellido,
  });
}
