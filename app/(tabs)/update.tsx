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

type UpdateItem = {
  id: string;
  title: string;
  description: string;
};

export default function UpdatesScreen() {
  const router = useRouter();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);

  useEffect(() => {
    const mockUpdates: UpdateItem[] = [
      { id: "1", title: "Nova turma iniciada", description: "Turma de Ballet Básico começa na próxima semana." },
      { id: "2", title: "Evento de Ballet Clássico", description: "Apresentação no Teatro Municipal." },
      { id: "3", title: "Férias de fim de ano", description: "Aulas suspensas de 20/12 a 05/01." },
    ];
    setUpdates(mockUpdates);
  }, []);

  const goBack = () => {
    router.push("../welcome");
  };

  const renderUpdate = ({ item }: { item: UpdateItem }) => (
    <View style={styles.updateItem}>
      <Text style={styles.updateTitle}>{item.title}</Text>
      <Text style={styles.updateDesc}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Atualizações</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>

      <FlatList
        data={updates}
        keyExtractor={(item) => item.id}
        renderItem={renderUpdate}
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
  updateItem: {
    backgroundColor: "#EED3C3",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginBottom: 5,
  },
  updateDesc: {
    fontSize: 14,
    color: "#6E4F3A",
  },
});
