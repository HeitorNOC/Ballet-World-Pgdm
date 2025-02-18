import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Vibration,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from "expo-av";
import { api } from "@/lib/axios";

const getDirectDriveLink = (url: string) => {
  if (!url.includes("drive.google.com")) return url;

  const match = url.match(/[-\w]{25,}/);
  return match
    ? `https://lh3.googleusercontent.com/d/${match[0]}=s220`
    : url;
};

type Step = {
  id: string;
  name: string;
  order: number;
  duration: number;
  restTime: number;
  imageUrl: string;
};

export default function CircuitDetailScreen() {
  const { circuitId } = useLocalSearchParams();
  const router = useRouter();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [isResting, setIsResting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [circuitDetailID, setCircuitDetailID] = useState<any>();

  useEffect(() => {
    async function fetchSteps() {
      try {
        const response = await api.get(`/circuitSteps/${circuitId}`);

        if (response.data.length > 0) {
          const orderedSteps = response.data.sort((a: Step, b: Step) => a.order - b.order);
          setCircuitDetailID(circuitId)
          setSteps(orderedSteps);
          setTimer(orderedSteps[0].duration)
        }
      } catch (error) {
        console.error("Erro ao carregar passos:", error);
        Alert.alert("Erro", "Não foi possível carregar os passos.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSteps();

  },[circuitDetailID]);

  function clearFields(): void {
    setIsResting(false)
    setIsLoading(true)
    setTimer(null)
    setCircuitDetailID(null)
    setCurrentStepIndex(0)
    setSteps([])
  }

  useEffect(() => {
    if (!timer || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer !== 0) return;

    playSound();
    Vibration.vibrate(500);

    if (isResting) {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
        setIsResting(false);
        setTimer(steps[currentStepIndex + 1].duration);
      } else {
        Alert.alert("Parabéns!", "Você concluiu o circuito!");
        clearFields()
        router.push("/exercise/student");
      }
    } else {
      setIsResting(true);
      setTimer(steps[currentStepIndex].restTime);
    }
  }, [timer]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/sounds/beep.mp3")
    );
    await sound.playAsync();
  }

  const confirmExit = () => {
    Alert.alert(
      "Sair do Circuito?",
      "Deseja mesmo sair do circuito em andamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          onPress: () => {
            clearFields()
            router.push("/exercise/student");
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando exercícios...</Text>
        <TouchableOpacity style={styles.backButton} onPress={confirmExit}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  if (steps.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Nenhum exercício disponível.</Text>
        <TouchableOpacity style={styles.backButton} onPress={confirmExit}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  const currentStep = steps[currentStepIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={confirmExit}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
       <Text 
          style={styles.title} 
          ellipsizeMode="tail">
          {isResting ? "" : currentStep.name}
        </Text>
      </View>

      <Image source={{ uri: getDirectDriveLink(currentStep.imageUrl) }} style={styles.image} />

      <Text style={styles.timerText}>
        {isResting ? "Descanso: " : "Tempo: "} {timer}s
      </Text>

      <TouchableOpacity style={styles.skipButton} onPress={() => setTimer(0)}>
        <Text style={styles.skipButtonText}>Pular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEAE2",
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
  flex: 1,
  flexWrap: "wrap",
  textAlign: "center",
  fontSize: 18,
  width: "80%", 
  alignSelf: "center"
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 80
  },
  timerText: {
    fontSize: 22,
    color: "#6E4F3A",
    fontWeight: "bold",
    marginBottom: 30,
  },
  skipButton: {
    backgroundColor: "#5C2E2E",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  skipButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#6E4F3A",
    textAlign: "center",
    marginTop: 50,
  },
});
