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
        console.log(data?.data[param] + "  parametro :" + param);
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