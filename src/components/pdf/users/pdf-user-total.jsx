import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
function PDFUSERTOTAL({ data, company, branch }) {
  const Day = new Date().toLocaleDateString("es-Pe");

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "#ffffff",
      padding: 20,
    },
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    containerVacio: {
      fontSize: 10,
      textAlign: "center",
      border: 1,
      borderColor: "#94a3b8",
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
      fontSize: 20,
    },
    textSecond: {
      fontSize: 13,
      marginTop: 6,
    },
    boxContent: {
     
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            width:'100%',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:'flex-start'
          }}
        >
          <View style={styles.boxContent}>
            <Text style={styles.text}>
              Empresa : 
              <Text style={{ fontWeight: "extrabold" }}> {company}</Text>
            </Text>
            <Text style={styles.textSecond}>
              Sucursal : <Text style={{ fontWeight: "extrabold" }}>{branch}</Text>
            </Text>
            <Text style={{ fontSize:'10px',marginTop:'10px' }}>
              Fecha : {Day}
            </Text>
          </View>
          <View >
            <Image src={"/IntisLogo.png"} style={{ width: "40px" }} />
            <Text style={{ fontSize: "10px", marginTop: "6px" }}>
              IntisCorp
            </Text>
          </View>
        </View>

        <View style={{ marginTop: "40px" }}>
          <Text style={{ fontSize: "12px", marginBottom: "10px" }}>
            Lista de usuarios registrados
          </Text>
          <View style={styles.containerVacio}>
            <TableHeader />
            <TableBody data={data ?? []} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFUSERTOTAL;

function TableBody({ data }) {
  const StyleHeader = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      gap: 5,
      borderBottom: 1,
      borderColor: "#94a3b8",
      fontSize: 9,
      textTransform: "capitalize",
    },
    textC: {
      borderRight: 1,
      paddingHorizontal: 5,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextPrimary: {
      width: "30px",
      borderRight: 1,

      paddingHorizontal: 5,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextSecond: {
      width: "100px",

      borderRight: 1,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextGnero: {
      width: "50px",
      borderRight: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextSpecialization: {
      width: "80px",
      borderRight: 1,

      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextStatus: {
      width: "40px",
      borderRight: 1,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    Anydesk: {
      width: "70px",
      borderRight: 1,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    Email: {
      width: "100px",
      borderRight: 1,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
  });
  if(data)return data?.map((ValueUser, index) => (
    <View style={StyleHeader.container} key={index}>
      <Text style={StyleHeader.TextPrimary}>{index}</Text>
      <Text style={StyleHeader.TextSecond}>
        {capitalizeText(`${ValueUser?.nombre} ${ValueUser?.apellido}`)}
      </Text>
      <Text style={StyleHeader.TextGnero}>{ValueUser?.genero} </Text>
      <Text style={StyleHeader.TextSpecialization}>
        {ValueUser?.cargo === "" ? "----" : capitalizeText(ValueUser?.cargo ?? "------")}{" "}
      </Text>
      <Text
        style={{
          ...StyleHeader.TextStatus,
          color: ValueUser?.estado === "Activo" ? "#16a34a" : "red",
        }}
      >
        {ValueUser?.estado ?? "------"}
      </Text>
      <Text style={StyleHeader.Anydesk}>{ValueUser?.anydesk_id} </Text>
      <Text style={StyleHeader.Email}>
      {ValueUser?.email[0]?.correo ?? "-----"}{" "}
      </Text>
    </View>
  ));
}

function TableHeader() {
  const StyleHeader = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      gap: 5,
      fontSize: 9,
      backgroundColor: "#bae6fd",
    },
    textC: {
      borderRight: 1,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextPrimary: {
      width: "30px",
      borderRight: 1,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextSecond: {
      width: "100px",
      borderRight: 1,

      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextGnero: {
      width: "50px",
      borderRight: 1,

      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextSpecialization: {
      width: "80px",
      borderRight: 1,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    TextStatus: {
      width: "40px",
      borderRight: 1,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    Anydesk: {
      width: "70px",
      borderRight: 1,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
    Email: {
      width: "100px",
      borderRight: 1,
      paddingVertical: 3,
      borderColor: "#94a3b8",
    },
  });

  return (
    <View style={StyleHeader.container}>
      <Text style={StyleHeader.TextPrimary}>Id</Text>
      <Text style={StyleHeader.TextSecond}>Nombre y Apellido</Text>
      <Text style={StyleHeader.TextGnero}>Genero</Text>
      <Text style={StyleHeader.TextSpecialization}>Cargo</Text>
      <Text style={StyleHeader.TextStatus}>Estado</Text>
      <Text style={StyleHeader.Anydesk}>anydesk id</Text>
      <Text style={StyleHeader.Email}>Email</Text>
    </View>
  );
}

function capitalizeText(inputText) {
  // Verificar si la entrada es válida
  if (!inputText || typeof inputText !== "string") {
    return "";
  }

  // Convertir la primera letra a mayúscula y el resto a minúscula
  return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
}
