import { Avatar, AvatarFallback, AvatarImage } from "@/componentUI/ui/avatar";
function Logo() {
  return (
    <header className="flex items-center gap-2 border rounded-lg p-3 py-2">
      <Avatar className="">
        <AvatarImage
          src="	https://www.intiscorp.com.pe/wp-content/uploads/2022/10/1-1-1.png"
          alt="@Intiscorp"
        />
        <AvatarFallback>Intiscorp</AvatarFallback>
      </Avatar>
      <h2 className="font-medium tracking-wide ">Intiscorp</h2>
    </header>
  );
}

export default Logo;
