import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useDecodedToken } from "@/hooks/useDecodeToken";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function StudentDashboard() {
    const { decoded, loading } = useDecodedToken();
    const [completedCircuits, setCompletedCircuits] = useState(0);
    const [totalCircuits, setTotalCircuits] = useState(0);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        if (!decoded) return;

        // Simulação de dados (mudar para API real quando necessário)
        setTimeout(() => {
            setCompletedCircuits(2); // Número de circuitos completos
            setTotalCircuits(5); // Total de circuitos
            setIsLoadingStats(false);
        }, 1000);
    }, [decoded]);

    if (loading || isLoadingStats) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#6E4F3A" />
                <Text style={styles.loadingText}>Carregando estatísticas...</Text>
            </View>
        );
    }

    if (!decoded) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Usuário não logado</Text>
            </View>
        );
    }

    // Dados para o gráfico (somente os completos)
    const dataCompletos = {
        data: [completedCircuits / totalCircuits],
    };

    // Configuração do gráfico
    const chartConfigCompletos = {
        backgroundGradientFrom: "#FDEAE2",
        backgroundGradientTo: "#FDEAE2",
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Verde para completos
        strokeWidth: 10,
    };

    const goBack = () => {
        router.push("../welcome");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Ionicons name="arrow-back-circle-outline" size={28} color="#6E4F3A" />
            </TouchableOpacity>
            <Text style={styles.title}>Dashboard do Aluno</Text>
            <Text style={styles.subTitle}>Bem-vindo(a), {decoded.email}!</Text>

            <View style={styles.chartContainer}>
                <ProgressChart
                    data={dataCompletos}
                    width={screenWidth * 0.6} // Ajustado para ocupar o centro
                    height={200}
                    strokeWidth={16}
                    radius={50}
                    chartConfig={chartConfigCompletos}
                    hideLegend={true} // Esconde legenda para customizar abaixo
                />

                {/* Label personalizada abaixo do gráfico */}
                <Text style={styles.statsText}>
                    Circuitos Completados: {completedCircuits} / {totalCircuits}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDEAE2",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    chartContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    backButton: {
        marginRight: 10,
    },
    loadingText: {
        marginTop: 10,
        color: "#6E4F3A",
    },
    text: {
        color: "#6E4F3A",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#6E4F3A",
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        color: "#6E4F3A",
        marginBottom: 20,
    },
    statsText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#6E4F3A",
    },
});

