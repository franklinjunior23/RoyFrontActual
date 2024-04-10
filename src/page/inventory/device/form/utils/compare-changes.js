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
    if (NewDataApi[dataapi] === undefined) continue;

    // Si el tipo de NewDataApi[dataapi] es "object", iteramos sobre sus elementos
    if (typeof NewDataApi[dataapi] === "object") {
      NewDataApi[dataapi].forEach((element, index) => {
        const keys = Object.keys(element);
        keys.forEach((key) => {
          if (element[key] !== Formdata[index]?.[key]) {
            Changes.push({
              type: "modified",
              field: `${dataapi} . ${key}`,
              before: element[key],
              after: Formdata[index]?.[key],
            });
          }
        });
      });
    }

    // Si Apidata no es igual a Formdata, agregamos un cambio a la lista de Changes
    if (Apidata !== Formdata && typeof Apidata !== "object") {
      Changes.push({
        type: "modified",
        field: dataapi,
        before: Apidata,
        after: Formdata,
      });
    }
  }

  console.log(Changes);
}

function CompareFields() {}

// Compare this snippet from src/pages/Inventario/Forms/utils/compare-objects.js:
