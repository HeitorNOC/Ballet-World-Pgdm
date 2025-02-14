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

type Aluno = {
  id: string;
  name: string;
  progress: string;
};

export default function AlunosScreen() {
  const router = useRouter();
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const mockAlunos: Aluno[] = [
      { id: "1", name: "Maria", progress: "Iniciante" },
      { id: "2", name: "João", progress: "Intermediário" },
      { id: "3", name: "Ana", progress: "Avançado" },
    ];
    setAlunos(mockAlunos);
  }, []);

  const goBack = () => {
    router.push("../welcome");
  };

  const goToAlunoDetail = (alunoId: string) => {
    router.push(`../student/${alunoId}`);
  };

  const renderItem = ({ item }: { item: Aluno }) => (
    <TouchableOpacity
      style={styles.alunoItem}
      onPress={() => goToAlunoDetail(item.id)}
    >
      <Ionicons name="person-outline" size={24} color="#6E4F3A" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.alunoName}>{item.name}</Text>
        <Text style={styles.alunoProgress}>{item.progress}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Alunos</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
  alunoItem: {
    backgroundColor: "#EED3C3",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
  },
  alunoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6E4F3A",
  },
  alunoProgress: {
    fontSize: 14,
    color: "#6E4F3A",
  },
});
