import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "@/lib/axios";
import { useDecodedToken } from "@/hooks/useDecodeToken";

type Aluno = {
  id: string;
  name: string;
  progress: string;
};

export default function AlunosScreen() {
  const router = useRouter();
  const { decoded, loading } = useDecodedToken();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [teacherCode, setTeacherCode] = useState<string | null>(null);

  useEffect(() => {
    if (!decoded) return;

    async function fetchTeacherCodeAndAlunos() {
      try {
        // 🔹 1. Buscar dados do usuário pelo ID
        const userResponse = await api.post("/user", { id: decoded?.sub });

        if (!userResponse.data || !userResponse.data.teacherCode) {
          throw new Error("TeacherCode não encontrado.");
        }

        const code = userResponse.data.teacherCode;
        setTeacherCode(code);

        // 🔹 2. Buscar alunos pelo teacherCode
        const alunosResponse = await api.post("/listUsersByTeacherCode", {
          teacherCode: code,
        });

        setAlunos(alunosResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar os alunos.");
      } finally {
        setLoadingData(false);
      }
    }

    fetchTeacherCodeAndAlunos();
  }, [decoded]);

  const goBack = () => {
    router.push("../welcome");
  };

  const goToAlunoDetail = (alunoId: string) => {
    router.push(`../student/${alunoId}`);
  };

  const goToAlunoChat = (aluno: Aluno) => {
    router.push({
      pathname: "/student/chatScreen",
      params: { userId: aluno.id, userName: aluno.name },
    });
  };

  const renderItem = ({ item }: { item: Aluno }) => (
    <TouchableOpacity
      style={styles.alunoItem}
      onPress={() => goToAlunoChat(item)}
    >
      <Ionicons name="person-outline" size={24} color="#6E4F3A" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.alunoName}>{item.name}</Text>
        <Text style={styles.alunoProgress}>
          {item.progress || "Sem progresso"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading || loadingData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6E4F3A" />
        <Text style={styles.loadingText}>Carregando alunos...</Text>
      </View>
    );
  }

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

      {alunos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum aluno encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6E4F3A",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6E4F3A",
    fontWeight: "bold",
  },
});
