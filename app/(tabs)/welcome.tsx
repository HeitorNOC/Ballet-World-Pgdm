import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { useDecodedToken } from "@/hooks/useDecodeToken"

export default function HomeScreen() {
  const router = useRouter()
  const { decoded, loading } = useDecodedToken()

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando...</Text>
      </View>
    )
  }

  if (!decoded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Usuário não logado!</Text>
      </View>
    )
  }

  function goToDashboard() {
    if (decoded && decoded.userType === "admin") {
      router.push("../dashboard/admin")
    } else if (decoded && decoded.userType === "professor") {
      router.push("../dashboard/professor")
    } else if (decoded && decoded.userType === "student") {
      router.push("../dashboard/student")
    }
  }

  const menuItems = []

  if (decoded.userType === "student") {
    menuItems.push(
      { label: "Treinos", icon: "play-outline", onPress: () => router.push("../exercise/student") },
      { label: "Perfil", icon: "person-circle-outline", onPress: () => router.push("../profile") },
      { label: "Passos", icon: "footsteps-outline", onPress: () => router.push("../steps") },
      { label: "História", icon: "book-outline", onPress: () => router.push("../history") },
      { label: "Atualizações", icon: "notifications-outline", onPress: () => router.push("../update") }
    )
  } else if (decoded.userType === "professor") {
    menuItems.push(
      { label: "Meus Alunos", icon: "people-outline", onPress: () => router.push("../student") },
      { label: "Treinos", icon: "create-outline", onPress: () => router.push("../exercise/professor") },
      { label: "Atualizações", icon: "notifications-outline", onPress: () => router.push("../update") },
      { label: "Perfil", icon: "person-circle-outline", onPress: () => router.push("../profile") },
      { label: "História", icon: "book-outline", onPress: () => router.push("../history") }
    )
  } else if (decoded.userType === "admin") {
    menuItems.push(
      { label: "Gerenciar Usuários", icon: "people-outline", onPress: () => router.push("../admin/users") },
      { label: "Atualizações", icon: "notifications-outline", onPress: () => router.push("../update") },
      { label: "Perfil", icon: "person-circle-outline", onPress: () => router.push("../profile") },
      { label: "História", icon: "book-outline", onPress: () => router.push("../history") }
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo(a), {decoded.email}!</Text>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.subtitle}>O que deseja fazer hoje?</Text>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Ionicons name={item.icon as any} size={36} color="#6E4F3A" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.menuItem} onPress={goToDashboard}>
          <Ionicons name="stats-chart-outline" size={36} color="#6E4F3A" />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FDEAE2",
    alignItems: "center",
    justifyContent: "center"
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
})
