import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const goToProfile = () => {
    router.push("../profile");
  };

  const goToAlunos = () => {
    router.push("../student");
  };

  const goToTreino = () => {
    router.push("../exercise");
  };

  const goToUpdates = () => {
    router.push("../update");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo(a)!</Text>
        <Image
          source={require("../../assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.subtitle}>O que deseja fazer hoje?</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={goToTreino}>
          <Ionicons name="play-outline" size={36} color="#6E4F3A" />
          <Text style={styles.menuText}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={goToAlunos}>
          <Ionicons name="people-outline" size={36} color="#6E4F3A" />
          <Text style={styles.menuText}>Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={goToUpdates}>
          <Ionicons name="notifications-outline" size={36} color="#6E4F3A" />
          <Text style={styles.menuText}>Updates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={goToProfile}>
          <Ionicons name="person-circle-outline" size={36} color="#6E4F3A" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FDEAE2",
    padding: 20,
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 4
  },
  title: {
    fontSize: 20,
    color: "#6E4F3A",
    fontWeight: "bold",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 16,
    color: "#6E4F3A",
    marginBottom: 30,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  menuItem: {
    backgroundColor: "#EED3C3",
    borderRadius: 10,
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    color: "#6E4F3A",
    marginTop: 5,
    fontWeight: "bold",
  },
});
