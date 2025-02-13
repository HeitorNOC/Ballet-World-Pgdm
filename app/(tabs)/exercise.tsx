import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type Treino = {
  id: string;
  title: string;
  duration: string;
};

export default function TreinoScreen() {
  const router = useRouter();
  const [treinos, setTreinos] = useState<Treino[]>([]);

  useEffect(() => {
    // Mock de treinos
    const mockTreinos: Treino[] = [
      { id: "1", title: "Aquecimento Básico", duration: "10 min" },
      { id: "2", title: "Alongamento", duration: "15 min" },
      { id: "3", title: "Barra Inicial", duration: "20 min" },
    ];
    setTreinos(mockTreinos);
  }, []);

  const goBack = () => {
    router.push("/(tabs)/welcome");
  };

  const handleStartTreino = (id: string) => {
    console.log("Iniciando treino:", id);
  };

  const renderTreino = ({ item }: { item: Treino }) => (
    <View style={styles.treinoItem}>
      <Text style={styles.treinoTitle}>{item.title}</Text>
      <Text style={styles.treinoDuration}>Duração: {item.duration}</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => handleStartTreino(item.id)}
      >
        <Ionicons name="play-circle-outline" size={24} color="#FFF" />
        <Text style={styles.startButtonText}>Iniciar</Text>
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

      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id}
        renderItem={renderTreino}
        style={styles.list}
      />
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
  },
  treinoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6E4F3A",
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
});
