import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const mockCircuits: any = {
  "1": { title: "Circuito Básico", duration: "10", steps: [{ id: "1", description: "Aquecer", duration: "5" }] },
  "2": { title: "Alongamento", duration: "15", steps: [{ id: "1", description: "Alongar costas", duration: "10" }] }
};

export default function EditCircuitScreen() {
  const { circuitId } = useLocalSearchParams();
  const router = useRouter();
  const circuit: any = mockCircuits[circuitId as string];

  const [title, setTitle] = useState(circuit.title);
  const [duration, setDuration] = useState(circuit.duration);
  const [steps, setSteps] = useState(circuit.steps);

  const updateStep = (index: number, field: string, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const saveChanges = () => {
    Alert.alert("Sucesso", "Circuito atualizado!");
    router.push("../exercise/professor");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("../exercise/professor")}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Circuito</Text>
      </View>

      <Text style={styles.label}>Nome do Circuito</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Duração (min)</Text>
      <TextInput style={styles.input} value={duration} keyboardType="numeric" onChangeText={setDuration} />

      <Text style={styles.label}>Passos do Circuito</Text>
      {steps.map((step: any, index: any) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Passo {index + 1}</Text>
          <TextInput style={styles.input} value={step.description} onChangeText={(text) => updateStep(index, "description", text)} />
          <TextInput style={styles.input} value={step.duration} keyboardType="numeric" onChangeText={(text) => updateStep(index, "duration", text)} />
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: "#FDEAE2", padding: 20 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    title: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
    label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
    input: { backgroundColor: "#FFF", borderRadius: 10, padding: 10, marginBottom: 10 },
    stepContainer: { backgroundColor: "#EED3C3", padding: 10, borderRadius: 10, marginBottom: 10 },
    stepTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
    addButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#5C2E2E", padding: 10, borderRadius: 10, marginBottom: 10 },
    addButtonText: { color: "white", marginLeft: 5 },
    saveButton: { backgroundColor: "#781A1A", padding: 10, borderRadius: 10 },
    saveButtonText: { color: "white", fontWeight: "bold", textAlign: "center" }
  });
  