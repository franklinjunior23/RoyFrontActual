import {
  IconBrandGithubCopilot,
  IconInfoCircle,
  IconPalette,
  IconUserCircle,
} from "@tabler/icons-react";

function InfoComponent() {
  return (
    <article className="invisible md:visible bottom-8 left-8 fixed w-12 h-12 bg-black/10 rounded-full dark:bg-white/60 cursor-pointer group">
      <div className="relative w-full h-full p-2.5">
        <IconBrandGithubCopilot className="w-full h-full text-black group-hover:animate-bounce" />
        <section className="absolute left-0 bottom-20 dark:bg-white/60 bg-black/10 rounded-md px-2 py-4 opacity-0 translate-y-8 transform transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          <nav>
            <ul className="flex flex-col gap-3.5">
              <li className="relative group/item">
                <IconUserCircle size={23} className=" hover:text-white/70" />
                <section className="absolute left-14 p-4 -top-2 rounded-md w-[300px] bg-white invisible group-hover/item:visible  ">
                  <p>User Conected : Franxx</p>
                </section>
              </li>
              <li className="relative">
                <IconPalette size={23} />
                <section className="absolute left-10 bg-white invisible">
                  Hola desde mi panel
                </section>
              </li>
              <li className="relative">
                <IconInfoCircle size={23} />
                <section className="absolute left-10 bg-white invisible">
                  Hola desde mi panel
                </section>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </article>
  );
}

export default InfoComponent;
