import { FactoryDataDevice } from "./GetDevice";

function removeUnFields(data, Fields) {
  return Object.keys(data)
    .filter((key) => Fields.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
}

export function compareChanges(dataForm, dataApi, Fields) {
  const Changes = [];
  const dataFactory = FactoryDataDevice(dataApi);

  const NewDataApi = removeUnFields(dataFactory, Fields);

  const NewDataForm = removeUnFields(dataForm, Fields);

  for (const dataapi in NewDataApi) {
    const Apidata =
      NewDataApi[dataapi]?.length === 0 ? undefined : NewDataApi[dataapi];
    const Formdata = NewDataForm[dataapi];

    // Si el valor de NewDataApi[dataapi] es undefined, saltamos esta iteración
    if (Apidata === undefined) continue;

    // Si el tipo de NewDataApi[dataapi] es "object", iteramos sobre sus elementos
    if (typeof Apidata === "object" && Apidata?.length > Formdata?.length) {
      if (Formdata?.length === 0) {
        Changes.push({
          type: "removed",
          field: dataapi,
          before: Apidata,
          after: undefined,
        });
        continue;
      } else {
        Changes.push({
          type: "modified",
          field: dataapi,
          before: Apidata,
          after: Formdata,
        });
        continue;
      }
    }

    if (typeof Apidata === "object" && Apidata?.length < Formdata?.length) {
      Changes.push({
        type: "add",
        field: dataapi,
        before: Apidata,
        after: Formdata,
      });
      continue;
    }

    if (typeof Apidata === "object") {
      Apidata?.forEach((element, index) => {
        const keys = Object.keys(element);
        keys.forEach((key) => {
          // element es un objeto

          // Si el campo de Formdata es undefined y el campo de la API no lo es , agregamos eliminado , agregamos un cambio y el nombre del campo a la lista de cambios
          if (
            Formdata?.length !== Apidata?.length &&
            Formdata[index]?.[key] === undefined &&
            element[key] !== undefined
          ) {
            if (Formdata?.length !== Apidata?.length) {
              console.log("Se ha eliminado un campo");
              Changes.push({
                type: "removed",
                field: `${dataapi} . ${key}`,
                before: element,
                after: undefined,
              });
            }
          }

          // SI el dato de la API es diferente al dato del formulario, agregamos un cambio y el nombre del campo a la lista de cambios
          if (
            element[key] !== Formdata[index]?.[key] &&
            element[key] !== undefined &&
            Formdata?.length === Apidata?.length
          ) {
            console.log("Se ha modificado un campo");
            Changes.push({
              type: "modified",
              field: `${dataapi}`,
              column: key,
              before: element[key],
              after: Formdata[index]?.[key],
            });
          }
        });
      });
    } else if (Apidata !== Formdata) {
      // Si Apidata no es igual a Formdata, agregamos un cambio a la lista de Changes
      Changes.push({
        type: "modified",
        field: dataapi,
        before: Apidata,
        after: Formdata,
      });
    }
  }
 

 return Changes
}


// Compare this snippet from src/pages/Inventario/Forms/utils/compare-objects.js:
