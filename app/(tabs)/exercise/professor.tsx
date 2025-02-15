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

export default function ProfessorExerciseScreen() {
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
    const createCircuit = () => router.push("../exercise/create")

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Gerenciar Treinos</Text>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={createCircuit}>
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <Text style={styles.createButtonText}>Criar Novo Circuito</Text>
            </TouchableOpacity>

            <FlatList
                data={circuits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.circuitItem}>
                        <Text style={styles.circuitTitle}>{item.title}</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => router.push(`../exercise/edit/${item.id}`)}>
                            <Text style={styles.editButtonText}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Excluir</Text>
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
    createButton: { backgroundColor: "#5C2E2E", padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", marginBottom: 20 },
    createButtonText: { color: "white", fontWeight: "bold", marginLeft: 5 },
    circuitItem: { backgroundColor: "#EED3C3", padding: 15, borderRadius: 10, marginBottom: 10 },
    circuitTitle: { fontSize: 16, fontWeight: "bold", color: "#6E4F3A" },
    editButton: { backgroundColor: "#FFA500", padding: 5, borderRadius: 5, marginTop: 5 },
    deleteButton: { backgroundColor: "#D9534F", padding: 5, borderRadius: 5, marginTop: 5 },
    editButtonText: { color: "white", fontWeight: "bold" },
    deleteButtonText: { color: "white", fontWeight: "bold" }
})
