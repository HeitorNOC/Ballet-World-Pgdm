import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type Circuit = {
  id: string
  title: string
  duration: string
  image: any
}

export default function StudentExerciseScreen() {
  const router = useRouter()
  const [circuits, setCircuits] = useState<Circuit[]>([])

  useEffect(() => {
    const mockCircuits: Circuit[] = [
      { id: "1", title: "Circuito Básico", duration: "10 min", image: require("@/assets/images/image_ballet_1.png") },
      { id: "2", title: "Alongamento", duration: "15 min", image: require("@/assets/images/imagem_materia.png") }
    ]
    setCircuits(mockCircuits)
  }, [])

  const goBack = () => router.push("../welcome")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Meus Treinos</Text>
      </View>

      <FlatList
        data={circuits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.circuitItem}>
            <Text style={styles.circuitTitle}>{item.title}</Text>
            <Text style={styles.circuitDuration}>Duração: {item.duration}</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push(`../exercise/${item.id}/steps`)}
            >
              <Ionicons name="play-circle-outline" size={24} color="#FFF" />
              <Text style={styles.startButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDEAE2", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { marginRight: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#6E4F3A" },
  circuitItem: { backgroundColor: "#EED3C3", padding: 15, borderRadius: 10, marginBottom: 10 },
  circuitTitle: { fontSize: 16, fontWeight: "bold", color: "#6E4F3A" },
  circuitDuration: { fontSize: 14, color: "#6E4F3A", marginBottom: 10 },
  startButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#5C2E2E", padding: 10, borderRadius: 10 },
  startButtonText: { color: "#FFF", fontWeight: "bold", marginLeft: 5 }
})
