import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
function PDFDEVICES({data}) {
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
          marginVertical: 0.5,
        },
      });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.containerVacio}></View>
      </Page>
    </Document>
  );
}

export default PDFDEVICES;
