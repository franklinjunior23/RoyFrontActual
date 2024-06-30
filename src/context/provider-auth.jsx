import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { VITE_TOKE_USER } from "@/helpers/config/axios-instance";

const ContextAuth = createContext();

export const UsecontextAuth = () => {
  const context = useContext(ContextAuth);
  return context;
};

export const AuthProvider = ({ children }) => {
  // declaracion de las variables a usar en el auth
  const userstore = "user_dat_camp";
  const usertoken = VITE_TOKE_USER;
  const navi = useNavigate();

  // estado que guardara la data del usuario logeado auth
  const [UserAuth, setUserAuth] = useState(() => {
    return userstore ? JSON.parse(localStorage.getItem(userstore)) : null;
  });
  const [RoleUser, setRoleUser] = useState(UserAuth?.rol);

  //
  useEffect(() => {
   
    setRoleUser(UserAuth?.rol);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserAuth]);

  const addStorage = ({ user, token }) => {
    localStorage.setItem(userstore, JSON.stringify(user));
    localStorage.setItem(usertoken, token);
  };

  const removeStorage = () => {
    localStorage.removeItem(userstore);
    localStorage.removeItem(usertoken);
  };

  function SignIn(dato, user) {
    setUserAuth(user);
    addStorage({ user, token: dato });
  }
  function SignUp() {
    removeStorage();
    setUserAuth(null);
    toast.success("Cerrado seccion correctamente");
    return navi("/");
  }
  // Observador del localStorage

  return (
    <ContextAuth.Provider
      value={{
        LogedAuth: UserAuth,
        AddToken: SignIn,
        RoleUser,
        setRoleUser,
        LogautUser: SignUp,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
