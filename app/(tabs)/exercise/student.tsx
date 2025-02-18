import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { api } from "@/lib/axios";


type Circuit = {
  id: string;
  name: string;
  description: string;
  duration: number;
  imageURL: string;
  createdAt: string;
};

export default function TreinoScreen() {
  const router = useRouter();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCircuits() {
      try {
        const response = await api.get("/listCircuits");

        setCircuits(response.data);
      } catch (error) {
        console.error("Erro ao carregar circuitos:", error);
        Alert.alert("Erro", "Não foi possível carregar os circuitos.");
      } finally {
        setLoading(false);
      }
    }

    fetchCircuits();
  }, []);


  const getDirectDriveLink = (url: string) => {
  if (!url.includes("drive.google.com")) return url;

  const match = url.match(/[-\w]{25,}/);
  return match
    ? `https://lh3.googleusercontent.com/d/${match[0]}=s220`
    : url;
};

  const goBack = () => {
    router.push("../welcome");
  };

  const goToCircuitDetail = (circuitId: string) => {
    router.push({
    pathname: "/exercise/circuitDetail",
    params: { circuitId },
  });

  };

  const renderCircuit = ({ item }: { item: Circuit }) => (
    <View style={styles.treinoItem}>
      <Image source={{ uri: getDirectDriveLink(item.imageURL) }} style={styles.treinoImage} />
      <Text style={styles.treinoTitle}>{item.name}</Text>
      <Text style={styles.treinoDescription}>{item.description}</Text>
      <Text style={styles.treinoDuration}>Duração: {item.duration} min</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => goToCircuitDetail(item.id)}>
        <Ionicons name="play-circle-outline" size={24} color="#FFF" />
        <Text style={styles.startButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Treino</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Carregando circuitos...</Text>
      ) : (
        <FlatList
          data={circuits}
          keyExtractor={(item) => item.id}
          renderItem={renderCircuit}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEAE2",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6E4F3A",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  list: {
    paddingHorizontal: 20,
  },
  treinoItem: {
    backgroundColor: "#EED3C3",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  treinoImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  treinoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginBottom: 5,
  },
  treinoDescription: {
    fontSize: 14,
    color: "#6E4F3A",
    textAlign: "center",
    marginBottom: 5,
  },
  treinoDuration: {
    fontSize: 14,
    color: "#6E4F3A",
    marginBottom: 10,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5C2E2E",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  startButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6E4F3A",
  },
});

