import { Codesandbox } from "lucide-react";

function Head() {
  return (
    <main className="p-8 bg-black/90 min-h-full">
      <div className="flex flex-col justify-between font-semibold h-full text-white">
        <span className=" flex items-center gap-4  text-lg">
          <Codesandbox className="" />
          Intiscorp Sac
        </span>
        <span>{'"'}Software de activos{'"'} </span>
      </div>
    </main>
  );
}

export default Head;
