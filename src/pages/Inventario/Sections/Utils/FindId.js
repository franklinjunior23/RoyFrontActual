export function DataFindIdDevice({IdItem,data}){
   const DataDevice = data?.find((item) => item.id === IdItem.getValue())
   return DataDevice;
}