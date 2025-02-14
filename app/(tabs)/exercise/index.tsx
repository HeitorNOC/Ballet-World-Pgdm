// app/exercise/index.tsx (Exemplo com expo-router)
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Definição do tipo Circuito (com steps)
type Step = {
  id: string;
  image: any;         // require(...) da imagem
  description: string;
  duration: number;   // duração em segundos
};
type Circuit = {
  id: string;
  title: string;
  duration: string;   // Ex. "10 min"
  image: any;         // Imagem ilustrativa do circuito
  steps: Step[];
};

export default function TreinoScreen() {
  const router = useRouter();
  const [circuits, setCircuits] = useState<Circuit[]>([]);

  useEffect(() => {
    // Simulamos 3 circuitos, cada um com steps diferentes
    const mockCircuits: Circuit[] = [
      {
        id: "1",
        title: "Circuito Básico",
        duration: "10 min",
        image: require("@/assets/images/image_ballet_1.png"),
        steps: [
          {
            id: "step1",
            image: require("@/assets/images/image_ballet_1.png"),
            description: "Aquecer e preparar braços.",
            duration: 5,
          },
          {
            id: "step2",
            image: require("@/assets/images/image_ballet_1.png"),
            description: "Exercício de ponta em primeira posição.",
            duration: 5,
          },
          {
            id: "step3",
            image: require("@/assets/images/image_ballet_1.png"),
            description: "Alongamento final.",
            duration: 5,
          },
        ],
      },
      {
        id: "2",
        title: "Alongamento",
        duration: "15 min",
        image: require("@/assets/images/imagem_materia.png"),
        steps: [
          // ...
        ],
      },
      {
        id: "3",
        title: "Barra Inicial",
        duration: "20 min",
        image: require("@/assets/images/cisne_negro.png"),
        steps: [
          // ...
        ],
      },
    ];
    setCircuits(mockCircuits);
  }, []);

  // Ao voltar, vamos para a tela de "welcome"
  const goBack = () => {
    router.push("../welcome");
  };

  // Quando clica em "Entrar", vamos à tela de detalhes do circuito
  const goToCircuitDetail = (circuitId: string) => {
    router.push(`../exercise/${circuitId}`);
  };

  const renderCircuit = ({ item }: { item: Circuit }) => (
    <View style={styles.treinoItem}>
      <Text style={styles.treinoTitle}>{item.title}</Text>
      <Text style={styles.treinoDuration}>Duração: {item.duration}</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => goToCircuitDetail(item.id)}
      >
        <Ionicons name="play-circle-outline" size={24} color="#FFF" />
        <Text style={styles.startButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
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
        data={circuits}
        keyExtractor={(item) => item.id}
        renderItem={renderCircuit}
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
