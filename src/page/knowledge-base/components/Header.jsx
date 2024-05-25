import { IconClipboardText, IconSearch, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/componentUI/ui/breadcrumb";
import { Button } from "@/componentUI/ui/button";

function Header({ children }) {
  const navi = useNavigate();
  return (
    <header className="flex flex-col md:items-end md:flex-row md:justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/Dashboard/home"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {!children ? (
              <BreadcrumbPage>Base de conocimiento</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={"/Dashboard/BaseConocimiento"}>
                  Base de conocimiento
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {children}
        </BreadcrumbList>
      </Breadcrumb>

      <Button onClick={() => navi(-1)} size="sm" className="w-fit mt-5 md:mt-0">
        Retroceder
      </Button>
    </header>
  );
}
export default Header;

Header.propTypes = {
  children: PropTypes.node,
};
