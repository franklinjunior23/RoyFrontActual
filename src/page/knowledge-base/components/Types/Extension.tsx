export enum FileExtensions {
  IMAGE_JPEG = "jpeg",
  IMAGE_JPG = "jpg",
  IMAGE_PNG = "png",
  IMAGE_GIF = "gif",
  PDF = "pdf",
  DOC = "doc",
  DOCX = "docx",
  ZIP = "zip",
  RAR = "rar",
}

export const FileMimeTypes = {
  [FileExtensions.IMAGE_JPEG]: "image/jpeg",
  [FileExtensions.IMAGE_JPG]: "image/jpeg",
  [FileExtensions.IMAGE_PNG]: "image/png",
  [FileExtensions.IMAGE_GIF]: "image/gif",
  [FileExtensions.PDF]: "application/pdf",
  [FileExtensions.DOC]: "application/msword",
  [FileExtensions.DOCX]:
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  [FileExtensions.ZIP]: "application/zip",
  [FileExtensions.RAR]: "application/x-rar-compressed",
};


console