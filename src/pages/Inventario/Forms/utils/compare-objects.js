/**
 * Compara dos objetos y detecta los cambios entre ellos.
 * @param {Object} original - Objeto original.
 * @param {Object} updated - Objeto actualizado.
 * @param {Array} [ignoredFields=[]] - Campos a ignorar durante la comparación.
 * @returns {Array} - Array de cambios detectados.
 */
export function findChanges(original, updated, ignoredFields = []) {
  const changes = [];

  const newData = Object.keys(original)
    .filter((key) => !ignoredFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = original[key];
      return obj;
    }, {});
  const updateNew = Object.keys(updated)
    .filter((key) => !ignoredFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = updated[key];
      return obj;
    }, {});

  function compareObjects(originalObj, updatedObj, path = "") {
    for (const key in originalObj) {
      if (!(key in updatedObj)) {
        changes.push({
          type: "removed",
          field: path + key,
          before: originalObj[key],
          after: undefined,
        });
      } else if (
        Array.isArray(originalObj[key]) &&
        Array.isArray(updatedObj[key])
      ) {
        if (
          JSON.stringify(originalObj[key]) !== JSON.stringify(updatedObj[key])
        ) {
          changes.push({
            type: "modified",
            field: path + key,
            before: originalObj[key],
            after: updatedObj[key],
          });
        }
      } else if (
        typeof originalObj[key] === "object" &&
        originalObj[key] !== null &&
        typeof updatedObj[key] === "object" &&
        updatedObj[key] !== null
      ) {
        compareObjects(originalObj[key], updatedObj[key], path + key + ".");
      } else if (originalObj[key] !== updatedObj[key]) {
        changes.push({
          type: "modified",
          field: path + key,
          before: originalObj[key],
          after: updatedObj[key],
        });
      }
    }

    for (const key in updatedObj) {
      if (!(key in originalObj)) {
        changes.push({
          type: "Agregar",
          field: path + key,
          before: undefined,
          after: updatedObj[key],
        });
      }
    }
  }

  compareObjects(newData, updateNew);

  return changes;
}

export function generateSummary(action) {
  if (!action || action.length === 0) {
    return 'No se detectaron cambios.';
  }

  const summary = action.map(change => {
    let after = JSON.stringify(change.after);

    switch (change.type) {
      case 'modified':
        return `El campo ${change.field} fue modificado a ${after}.`;
      case 'removed':
        return `El campo ${change.field} fue eliminado.`;
      case 'added':
        return `El campo ${change.field} fue agregado con el valor ${after}.`;
      default:
        return '';
    }
  });

  return summary.join(' ');
}