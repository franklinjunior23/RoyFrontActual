import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  containerVacio: {
    fontSize: 10,
    textAlign: "center",
  },
  section: {
    maxWidth: "156px",
    width: "160px", // porcentaje de ancho
    height: "80px",
    margin: 10,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    // altura en puntos
    border: "1px solid rgba(0, 0, 0, 0,0.6)", // grosor del borde en puntos

    borderRadius: 4,
  },
  text: {
    fontSize: 9,
    marginVertical:0.5,
  },
});

export const ItemPdfEtiqueta = ({ data }) => {
  // Obtén la fecha actual
  const fechaActual = new Date();

  // Extrae el año de la fecha actual
  const añoActual = fechaActual.getFullYear();

  if (data?.DataDispositivo.length === 0) {
    // Si no hay dispositivos, mostrar un mensaje
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.containerVacio}>
            <Text style={styles.containerVacio}>
              No hay dispositivos disponibles.
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {data?.DataDispositivo?.map((device, index) => (
            <View key={index} style={styles.section}>
              <View style={{ width: "70%" }}>
                <View style={{flexDirection:'row',alignItems:'center',marginBottom:2}}>
                  <Image
                    src={"/IntisLogo.png"}
                    style={{ width: "25px", height: "25px" }}
                  />
                  <Text style={{ fontSize: 11, fontWeight: 800,marginLeft:2 }}>
                    {device?.codigo_dispositivo ?? "null"}
                  </Text>
                </View>
                <Text style={styles.text}>Nombre: {device.nombre}</Text>
                <Text style={styles.text}>
                  Empresa : {device.Sucursale?.Empresa?.nombre}
                </Text>
                <Text style={styles.text}>
                  Sucursal : {device.Sucursale?.nombre}
                </Text>
              </View>

              <View
                style={{
                  width: "30%",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  style={{ width: "40px", height: "40px", marginTop: 13 }}
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=intisoft.com.pe/Dispositivo/${device.id}?Auth=${device.Sucursale?.Token}`}
                />
                <Text style={{ fontSize: 8, textAlign: "center",marginTop:3}}>
                  {añoActual}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
