import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { VITE_TOKE_USER } from "../services/ConfigApi";

const ContextLoged = createContext();

export const UseContextLoged = () => {
  const context = useContext(ContextLoged);
  return context;
};

export const ContextoAuth = ({ children }) => {
  const [LogedAuth, setLogedAuth] = useState(() => {
    const storedUser = localStorage.getItem("user_dat_camp");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [RoleUser, setRoleUser] = useState(LogedAuth?.rol);

  useEffect(() => {
    setRoleUser(LogedAuth?.rol); // Actualiza RoleUser cuando cambie LogedAuth
  }, [LogedAuth]);

  function AddToken(dato, user) {
    setLogedAuth(user);
    localStorage.setItem("user_dat_camp", JSON.stringify(user));
    return localStorage.setItem(VITE_TOKE_USER, dato);
  }
  function LogautUser(){
     localStorage.removeItem('user_dat_camp')
     localStorage.removeItem(VITE_TOKE_USER)
     setLogedAuth(null)
  }
  // Observador del localStorage

  return (
    <ContextLoged.Provider
      value={{ LogedAuth, AddToken, RoleUser, setRoleUser,LogautUser }}
    >
      {children}
    </ContextLoged.Provider>
  );
};
ContextoAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
