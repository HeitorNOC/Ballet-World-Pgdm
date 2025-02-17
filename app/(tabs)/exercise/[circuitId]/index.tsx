// app/exercise/[circuitId]/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Exemplo simples. Na prática, você buscaria os dados de um "store", 
// de um contexto, ou passaria via params. Aqui iremos mockar.
const circuitMockData: any = {
  "1": {
    title: "Circuito Básico",
    description:
      "Este circuito consiste em 3 passos para aquecer, trabalhar a barra e alongar.",
    image: require("@/assets/images/image_ballet_1.png"),
  },
  "2": {
    title: "Alongamento",
    description:
      "Circuito de 2 passos focado em alongamento avançado.",
    image: require("@/assets/images/imagem_materia.png"),
  },
  "3": {
    title: "Barra Inicial",
    description:
      "Circuito para quem está começando a praticar na barra.",
    image: require("@/assets/images/cisne_negro.png"),
  },
};

export default function CircuitDetailScreen() {
  const { circuitId } = useLocalSearchParams(); // “1”, “2” ou “3”
  const router = useRouter();

  // Função para voltar (caso queira)
  const goBack = () => {
    router.push("../exercise");
  };

  // Pega dados do circuito
  const data: any = circuitMockData[circuitId as string];

  // Iniciar -> vai para a tela de passos
  const goToSteps = () => {
    router.push(`../welcome`);
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Circuito não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho simples */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{data.title}</Text>
      </View>

      <Image source={data.image} style={styles.image} />

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity style={styles.startButton} onPress={goToSteps}>
        <Text style={styles.startButtonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEAE2",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: "#6E4F3A",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#6E4F3A",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#5C2E2E",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
