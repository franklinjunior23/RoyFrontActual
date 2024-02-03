import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

function PDF_PC({ data }) { 
  console.log(data)
  const Day = new Date().toLocaleDateString("es-Pe");
  function ViewInformation() {
    return (
      <View
        style={{ border: "1px solid gray", paddingLeft: 10, paddingBottom: 20 }}
      >
        <Text style={styles.TitleSection}>Informacion</Text>
        <Text style={styles.Texto}>
          Nombre dispositivo : {data?.data?.nombre ?? "#E"}
        </Text>
        <Text style={styles.Texto}>Tipo : {data?.data?.tipo ?? "#E"}</Text>
        <Text style={styles.Texto}>
          Tipo Dispositivo : {data?.data?.tipo_Disp ?? "#E"}
        </Text>
        <Text style={styles.Texto}>
          Codigo : {data?.data?.codigo_dispositivo ?? "#E"}{" "}
        </Text>
        <Text style={styles.Texto}>Marca : {data?.data?.marca ?? "#E"} </Text>
        <Text style={styles.Texto}>
          Estado :
          <Text
            style={{
              textAlign: "center",
              width: 200,
              backgroundColor: data?.data?.estado === "Activo" && "#22C55E",
              color: "white",
            }}
          >
            {data?.data?.estado ?? "#E"}
          </Text>
        </Text>
      </View>
    );
  }
  function ViewSystemOperv() {
    return (
      <View
        style={{ border: "1px solid gray", paddingLeft: 10, paddingBottom: 20 }}
      >
        <Text style={styles.TitleSection}>Systema Operativo</Text>
        <Text style={styles.Texto}>Sistema operacional: Microsoft Windows</Text>
        <Text style={styles.Texto}>
          Versión de la consola del sistema operativo: 19045
        </Text>
        <Text style={styles.Texto}>Service Pack: 6.2.9200.0</Text>
        <Text style={styles.Texto}>
          Licencia sistema operacional: QJP2H-N7YCR-8G37M-MG234-QGPKC
        </Text>
      </View>
    );
  }

  function ViewPlaca() {
    return (
      <View
        style={{
          border: "1px solid gray",
          paddingLeft: 10,
          paddingBottom: 20,
          width: "50%",
        }}
      >
        <Text style={{ ...styles.TitleSection, textAlign: "center" }}>
          Placa Madre
        </Text>

        <Text style={styles.Texto}>
          Placa Modelo :{" "}
          {data?.data?.DetalleDispositivos[0]?.Placa_modelo ?? "#E"}
        </Text>
        <Text style={styles.Texto}>
          Placa Detalle : {data?.data?.DetalleDispositivos[0]?.Placa_detalle}
        </Text>
      </View>
    );
  }
  function ViewProcesador() {
    return (
      <View
        style={{
          border: "1px solid gray",
          paddingLeft: 10,
          paddingBottom: 20,
          width: "50%",
        }}
      >
        <Text style={{ ...styles.TitleSection, textAlign: "center" }}>
          Procesador
        </Text>
        <Text style={styles.Texto}>
          Marca : {data?.data?.DetalleDispositivos[0]?.Procesador_marca}
        </Text>
        <Text style={styles.Texto}>
          Modelo : {data?.data?.DetalleDispositivos[0]?.Procesador_modelo}
        </Text>
      </View>
    );
  }
  function ViewStore() {
    return (
      <View
        style={{
          border: "1px solid gray",
          paddingLeft: 10,
          paddingBottom: 20,
        
        }}
      >
        <Text style={{ ...styles.TitleSection, textAlign: "center" }}>
          Almacenamiento
        </Text>
        <Text style={styles.Texto}>
          Cantidad : {data?.data?.DetalleDispositivos[0]?.Almacenamiento_canti}
        </Text>
        <Text style={styles.Texto}>
          Total : {data?.data?.DetalleDispositivos[0]?.Almacenamiento_detalle.reduce(
            (total, item) => total + Number(item.gb),
            0
          )}
        </Text>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",marginTop:10 }}
        >
          {data?.data?.DetalleDispositivos[0]?.Almacenamiento_detalle.map(
            (ItemRam, index) => (
              <View
                style={{
                  borderRight: "2px solid gray",
                  display: "flex",
                  gap: 3,
                  paddingHorizontal: 10,
                  ...styles.Texto,
                }}
                key={index}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>
                  Almacenamiento-{index + 1}
                </Text>
                <Text>Tipo : {ItemRam.tipo ?? "$e"}</Text>
                <Text>Marca : {ItemRam.marca ?? "$e"}</Text>
                <Text>estado : {ItemRam.estado ?? "$e"} Mhz</Text>
                <Text>Serial : {ItemRam.serial ?? "$e"}</Text>
                <Text>Gb : {ItemRam.gb ?? "$e"} gb</Text>
                
              </View>
            )
          )}
        </View>
      </View>
    );
  }
  function ViewRedes() {
    return (
      <View
        style={{
          border: "1px solid gray",
          paddingLeft: 10,
          paddingBottom: 20,
        
        }}
      >
        <Text style={{ ...styles.TitleSection, textAlign: "center" }}>Red</Text>
        <Text style={styles.Texto}>
          Ip : {data?.data?.DetalleDispositivos[0]?.Config_ip}
        </Text>
        <Text style={styles.Texto}>
          Mac : {data?.data?.DetalleDispositivos[0]?.Config_mac}
        </Text>
        <Text style={styles.Texto}>
          User : {data?.data?.DetalleDispositivos[0]?.Config_user ?? 'null'}
        </Text>
        <Text style={styles.Texto}>
          Password : {data?.data?.DetalleDispositivos[0]?.Config_contra  ?? 'null'}
        </Text>
      </View>
    );
  }
  function ViewRam() {
    return (
      <View
        style={{
          border: "1px solid gray",
          paddingLeft: 10,
          paddingBottom: 20,
        }}
      >
        <Text style={{ ...styles.TitleSection, textAlign: "center" }}>Ram</Text>
        <Text style={styles.Texto}>
          Cantidad : {data?.data?.DetalleDispositivos[0]?.Ram_cantidad}
        </Text>
        <Text style={styles.Texto}>
          Total :{" "}
          {data?.data?.DetalleDispositivos[0]?.Ram_Modulos.reduce(
            (total, item) => total + Number(item.gb),
            0
          )}{" "}
          gb
        </Text>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",marginTop:10 }}
        >
          {data?.data?.DetalleDispositivos[0]?.Ram_Modulos.map(
            (ItemRam, index) => (
              <View
                style={{
                  borderRight: "2px solid gray",
                  display: "flex",
                  gap: 3,
                  paddingHorizontal: 10,
                  ...styles.Texto,
                }}
                key={index}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>
                  Ram :{index + 1}
                </Text>
                <Text>Tipo : {ItemRam.tipo ?? "$e"}</Text>
                <Text>Marca : {ItemRam.marca ?? "$e"}</Text>
                <Text>Mhz : {ItemRam.mhz ?? "$e"}Mhz</Text>
                <Text>Gb : {ItemRam.gb ?? "$e"}gb</Text>
                <Text>Serial : {ItemRam.serial ?? "$e"}</Text>
              </View>
            )
          )}
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    PageStyle: {
      padding: 20,
      fontSize: 14,
    },
    TitlePage: {
      fontSize: 25,
    },
    Logo: {
      fontSize: 18,
    },
    Texto: {
      fontSize: 12,
      marginVertical: 1,
    },
    Flex: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    TitleSection: {
      borderBottom: "1px solid gray",
      fontSize: 16,
      paddingVertical: 10,
      marginBottom: 10,
    },
  });
  return (
    <Document>
      <Page size={"A4"} style={styles.PageStyle}>
        <View>
          <Text style={styles.TitlePage}>{data?.data?.nombre}</Text>
          <Text>{Day}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.Logo}>Intiscorp</Text>
          <Text style={styles.Texto}>
            Av. Manuel Olguín, 501 - , Santiago de Surco Lima - PE
          </Text>
          <Text style={styles.Texto}>Tel: 113090-7950</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <ViewInformation />
          <ViewSystemOperv />
          <View style={styles.Flex}>
            <ViewPlaca />
            <ViewProcesador />
          </View>
          <ViewRam />
        </View>
      </Page>
      <Page size={"A4"} style={styles.PageStyle}>
        <ViewStore />

        <ViewRedes />
      </Page>
    </Document>
  );
}
PDF_PC.propTypes = {
  data: PropTypes.object.isRequired,
};
export default PDF_PC;
