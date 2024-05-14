import PropTypes from "prop-types";
import CompanyImg from "/Figures/company-item.webp";
import { Link } from "react-router-dom";
import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";
import TruncateText from "@/helpers/utils/truncate-text";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/componentUI/ui/popover";
import { Pencil } from "lucide-react";
import FormEdit from "@/page/branch/section/FormEdit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/componentUI/ui/dropdown-menu";

function CompanyItem({ nombre, createdAt }) {

  return (
    <section className="bg-orange-200/80 w-[360px] h-[140px] relative p-3 rounded-lg overflow-hidden shadow-md">
      <Link to={`/Dashboard/Home/${nombre}`}>
        <div className="flex flex-col justify-between h-full px-2 py-1 dark:text-white/80">
          <h3 className="text-[27px] font-extrabold">
            {TruncateText({ text: nombre, maxLength: 20 })}{" "}
          </h3>
          <span className="z-50 block text-sm font-bold">
            {FormateDayD(createdAt) ?? "00/00/00"}
          </span>
        </div>

        <img
          src={CompanyImg}
          alt="Company Head"
          aria-hidden={true}
          className="absolute top-0 left-0 object-cover w-full h-full fill-transparent"
        />
      </Link>
      <div className=" absolute top-2 right-2 ">
        <DropdownMenu>
          <DropdownMenuTrigger>* * *</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Popover>
                <PopoverTrigger className="flex items-center gap-2">
                  <Pencil className="w-4 h-4" />
                  Editar
                </PopoverTrigger>
                <PopoverContent>
                  <FormEdit />
                </PopoverContent>
              </Popover>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Renderizado condicional del menú de opciones */}
    </section>
  );
}

CompanyItem.propTypes = {
  nombre: PropTypes.string,
  createdAt: PropTypes.string,
};

export default CompanyItem;
