import { IconBell } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { VITE_API_DOMIN, VITE_TOKE_USER } from "../../services/ConfigApi";
import { io } from "socket.io-client";
import ListNotifys from "./components/ListNotifys";

/**
 * Component for displaying notifications.
 *
 * @returns {JSX.Element} The Notify component.
 */
function Notify() {
  const [ActiveNotifyView, setActiveNotifyView] = useState(false);
  const [DataNotification, setDataNotification] = useState([]);
  const [ErrorLogout, setErrorLogout] = useState(false);
  const [MessageRecent, setMessageRecent] = useState([]);

  function HandleNotifyView() {
    setActiveNotifyView(!ActiveNotifyView);
  }

  function handleReciviedDats(datos) {
    if (datos?.error === true) {
      setErrorLogout(true);
      setMessageRecent(datos);
      return;
    }
    if (DataNotification.length === 0) setDataNotification([...datos]);
  }

  function RecivideMessageRecent(datos) {
    setDataNotification([...datos]);
  }

  useEffect(() => {
    const socket = io(VITE_API_DOMIN);
    socket.emit("autenticarUsuario", localStorage.getItem(VITE_TOKE_USER));
    socket.on("datosDesdeServidor", handleReciviedDats);
    socket.on("mensajeNuevo", RecivideMessageRecent);
    return () => {
      socket.disconnect();
    };
  }, []);

  if (ErrorLogout === true) {
    return (
      <h3 className="fixed bg-slate-500/40 z-50 top-0 right-0 w-screen h-screen grid place-content-center text-center">
        Error <br /> {MessageRecent.message}
      </h3>
    );
  }

  const categorizeNotifications = () => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const groupedByMonth = {};
    const recents = [];
    const todayNotifications = [];
    const yesterdayNotifications = [];
    const activeNotifications = [];

    DataNotification.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      const monthKey = `${createdAt.getFullYear()}-${String(
        createdAt.getMonth() + 1
      ).padStart(2, "0")}`;

      if (createdAt.toDateString() === today) {
        todayNotifications.push(item);
      } else if (createdAt.toDateString() === yesterday.toDateString()) {
        yesterdayNotifications.push(item);
      } else {
        if (!groupedByMonth[monthKey]) {
          groupedByMonth[monthKey] = [];
        }

        groupedByMonth[monthKey].push(item);
      }

      // Filtrar notificaciones recientes (últimos 7 días)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      if (createdAt >= sevenDaysAgo) {
        recents.push(item);
      }

      // Filtrar notificaciones activas
      if (item.notifications_reads.some((read) => !read.Read)) {
        activeNotifications.push(item);
      }
    });

    return {
      recents,
      today: todayNotifications,
      yesterday: yesterdayNotifications,
      other: groupedByMonth,
      activeCount: activeNotifications.length,
    };
  };

  const categorizedNotifications = categorizeNotifications();

  return (
    <>
      <span className="absolute -bottom-2 rounded-full text-sm -right-2 bg-red-500 font-semibold px-2 text-white">
        {categorizedNotifications.activeCount}
      </span>
      <IconBell
        width={25}
        height={30}
        strokeWidth={1.5}
        onClick={HandleNotifyView}
      />

      {ActiveNotifyView && (
        <header className="absolute shadow-xl top-16 right-0 z-50 py-5 px-5 rounded-xl bg-white w-[375px] h-[500px]">
          <section className="h-full overflow-y-auto custom-scrollbar pr-2">
            <ListNotifys
              LabelList={"Hoy"}
              pages={3}
              data={categorizedNotifications.today}
            />

            <ListNotifys
              LabelList={"Ayer"}
              pages={3}
              data={categorizedNotifications.yesterday}
            />

            {Object.keys(categorizedNotifications.other).map((key) => (
              <ListNotifys
                LabelList={key}
                key={key}
                pages={3}
                data={categorizedNotifications.other[key]}
              />
            ))}
          </section>
        </header>
      )}
    </>
  );
}

export default Notify;
