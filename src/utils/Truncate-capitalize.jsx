export function TruncateAndCapitalizeText(inputText, maxLength) {
  // Verificar si la entrada es válida
  if (!inputText || typeof inputText !== "string") {
    return "";
  }

  // Truncar el texto si se proporciona maxLength
  if (
    maxLength &&
    typeof maxLength === "number" &&
    inputText.length > maxLength
  ) {
    inputText = inputText.slice(0, maxLength) + " ...";
  }

  // Convertir la primera letra a mayúscula y el resto a minúscula
  return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
}
