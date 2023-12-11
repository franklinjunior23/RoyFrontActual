# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

//
switch (type) {
case 'CREATEEMPRESA':
return <FormCreate handle={funct}/>;
case 'CREATESUCURSAL':
return <FormCSucursal handle={funct} />
case 'CREATEUSER':
return <FormCUser>

}
eso son los tipos de modales

{TypeDisp === "PC" &&
DatPc?.map((valu, index) => (

<option value={valu.nombre} key={index}>
{valu.nombre}
</option>
))}

                    {TypeDisp === "LAPTOP" &&
                      DatLap?.map((value, index) => (
                        <option value={value.nombre} key={index}>
                          {value.nombre}
                        </option>
                      ))}

Recordar - que no poner '/'

FormDisp.forEach((param) => {
if (data?.data && data?.data[param] !== null && data?.data[param] !== undefined) {
console.log(data?.data[param] + " parametro :" + param);
setValue(param, data.data[param]);
} else if (
data?.DetalleDispositivos &&
data.DetalleDispositivos[0] &&
data.DetalleDispositivos[0][param] !== null
) {
console.log("aca arriba");
setValue(param, data.DetalleDispositivos[0][param]);
}
});

---

estados de los dispositivos

Activo
Inaperativa
Malograda

---

          <Controller
            control={control}
            name="estado"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <ReactSelect
              name={name}
              ref={ref}
              onChange={(e) => {
                onChange(e?.value);
              }}
              onBlur={onBlur}
              value={value?.value}
              closeMenuOnSelect={true}
              placeholder={"Estado Del Dispositivo ..."}
              getOptionLabel={(e) => e.value}
              getOptionValue={(e) => e.value}
                options={[
                  { value: "Activo", label: "Activo" },
                  { value: "Inaperativa", label: "Inaperativa" },
                ]}
                isClearable
              />

            )}
          />

 {/* <div className="f  flex justify-between items-center bg-black/40 text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconFileDescription size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div>
          <div className="f  flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconPhoto size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div>
          <div className="f  flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconPhoto size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div>
          <div className="f  flex justify-between items-center bg-black/40 dark:text-white py-2 rounded-md px-2">
            <div className="flex items-center gap-2">
              <IconPhoto size={36} /> <h3>Nombre del archivo</h3>
            </div>
            <IconX />
          </div> */}


Version
0.9 //
En la versión 0.9 de nuestro proyecto, se introdujo la sección Home, que muestra una lista de empresas. Para lograr esto, se elaboraron los items necesarios para mostrar la información de cada empresa, como su nombre, descripción y logotipo. También se agregaron funciones para crear nuevas empresas y para que los usuarios inicien sesión en la aplicación.

Además, se trabajó en la funcionalidad de la sección Home para que los usuarios puedan ver la información de cada empresa y navegar a la página de detalles de cada una. También se agregó la capacidad de filtrar la lista de empresas por nombre y por categoría.

En resumen, la versión 0.9 de nuestro proyecto incluye la sección Home, que muestra una lista de empresas con información detallada y la capacidad de filtrar y navegar a la página de detalles de cada una. También se agregaron funciones para crear nuevas empresas y para que los usuarios inicien sesión en la aplicación.


1.1
Se agrego una simple agregar un archivo a la base de conocimiento en la cual se podia registrar una accion 



<input class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>


LISTAS DE ERRORES : 



NTFD-23 : ERROR EN LA DESCRIPCION DE LA NOTIFICACION
NTFD-22 : ERROR BACKEND CONTROLADOR UPDATE DE NOTIFICACIONES 
BDUPT100 : ERROR EN EL BACKEND AL ACTUALIZAR UN DOCUMENTO DE LA BASE DE CONOCIMIENTOS

// ruta para escanear  =>>>

intisoft/Dispositivo/:id