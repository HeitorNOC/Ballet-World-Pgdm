// app/exercise/[circuitId]/steps/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";

// Para exemplo, vamos usar o mesmo mock do TreinoScreen
// (Mas você poderia puxar de um Context/Store).
// Este mock deve bater com os "steps" do TreinoScreen.
const circuitsData: any = {
  "1": [
    {
      id: "step1",
      image: require("@/assets/images/image_ballet_1.png"),
      description: "Aquecer e preparar braços.",
      duration: 5,
    },
    {
      id: "step2",
      image: require("@/assets/images/image_ballet_1.png"),
      description: "Exercício de ponta em primeira posição.",
      duration: 5,
    },
    {
      id: "step3",
      image: require("@/assets/images/image_ballet_1.png"),
      description: "Alongamento final.",
      duration: 5,
    },
  ],
  "2": [
    // ...
  ],
  "3": [
    // ...
  ],
};

export default function StepScreen() {
  const { circuitId } = useLocalSearchParams();
  const router = useRouter();

  // Índice do passo atual
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Tempo restante do passo atual
  const [timeLeft, setTimeLeft] = useState(0);

  // Array de steps
  const steps: any = circuitsData[circuitId as string] || [];

  // Opção de voltar manualmente
  const goBack = () => {
    router.push("../exercise");
  };

  // Se não houver steps, exibe mensagem
  if (!steps.length) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text>Nenhum passo encontrado para esse circuito.</Text>
      </View>
    );
  }

  // Dados do passo atual
  const currentStep = steps[currentStepIndex];

  // Ao montar a tela ou mudar de passo, reinicia o countdown
  useEffect(() => {
    setTimeLeft(currentStep.duration);
  }, [currentStepIndex]);

  // Efeito para o timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newValue = prev - 1;
        if (newValue === 0) {
          // Vibrar quando chegar a zero
          Vibration.vibrate(500);
        }
        return newValue;
      });
    }, 1000);

    // Limpa o intervalo ao desmontar
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Avançar para o próximo passo
  const goNextStep = () => {
    // Se estiver no último passo, volta para a tela de exercícios
    if (currentStepIndex === steps.length - 1) {
      router.push("/exercise");
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Passo {currentStepIndex + 1}</Text>
        <View style={{ width: 40, height: 40 }} />
      </View>

      {/* Imagem do passo */}
      <Image source={currentStep.image} style={styles.stepImage} />

      {/* Descrição */}
      <Text style={styles.description}>{currentStep.description}</Text>

      {/* Countdown */}
      <Text style={styles.countdown}>
        {timeLeft > 0 ? `Tempo restante: ${timeLeft}s` : "Concluído!"}
      </Text>

      {/* Botão Próximo */}
      <TouchableOpacity style={styles.nextButton} onPress={goNextStep}>
        <Text style={styles.nextButtonText}>
          {currentStepIndex === steps.length - 1 ? "Finalizar" : "Próximo"}
        </Text>
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
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6E4F3A",
  },
  stepImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    color: "#6E4F3A",
    marginBottom: 20,
    textAlign: "center",
  },
  countdown: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#5C2E2E",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  nextButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
