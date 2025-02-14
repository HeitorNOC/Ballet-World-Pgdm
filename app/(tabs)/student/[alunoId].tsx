import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AlunoDetailScreen() {
  const router = useRouter();
  const { alunoId } = useLocalSearchParams()
  const [alunoName, setAlunoName] = useState("");
  const [progress, setProgress] = useState("");

  useEffect(() => {
    if (alunoId === "1") {
      setAlunoName("Maria");
      setProgress("Iniciante");
    } else if (alunoId === "2") {
      setAlunoName("João");
      setProgress("Intermediário");
    } else {
      setAlunoName("Ana");
      setProgress("Avançado");
    }
  }, [alunoId]);

  const goBack = () => {
    router.push("../student");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes do Aluno</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.alunoName}>{alunoName}</Text>
        <Text style={styles.alunoProgress}>Nível: {progress}</Text>
        {/* Outros detalhes, lista de treinos concluídos, etc. */}
      </View>
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
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  alunoName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginBottom: 10,
  },
  alunoProgress: {
    fontSize: 16,
    color: "#6E4F3A",
  },
});
