import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateCircuitScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [steps, setSteps] = useState([{ id: "1", description: "", duration: "" }]);

  const goBack = () => router.push("../exercise/professor");

  const addStep = () => {
    setSteps([...steps, { id: (steps.length + 1).toString(), description: "", duration: "" }]);
  };

  const updateStep = (index: number, field: string, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const saveCircuit = () => {
    if (!title || !duration || steps.some(step => !step.description || !step.duration)) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    Alert.alert("Sucesso", "Circuito criado!");
    router.push("../exercise/professor");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Criar Circuito</Text>
      </View>

      <Text style={styles.label}>Nome do Circuito</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex: Barra Inicial" />

      <Text style={styles.label}>Duração (min)</Text>
      <TextInput style={styles.input} value={duration} onChangeText={setDuration} placeholder="Ex: 10" keyboardType="numeric" />

      <Text style={styles.label}>Passos do Circuito</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Passo {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={step.description}
            onChangeText={(text) => updateStep(index, "description", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Duração (seg)"
            value={step.duration}
            keyboardType="numeric"
            onChangeText={(text) => updateStep(index, "duration", text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addStep}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addButtonText}>Adicionar Passo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={saveCircuit}>
        <Text style={styles.saveButtonText}>Salvar Circuito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#FDEAE2", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 50 },
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
