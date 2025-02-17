import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useDecodedToken } from "@/hooks/useDecodeToken";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function ProfessorDashboard() {
    const { decoded, loading } = useDecodedToken();
    const [myStudents, setMyStudents] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!decoded) return;

        // Simulação de dados (mudar para API real quando necessário)
        setTimeout(() => {
            setMyStudents(4); // Número de alunos com professor
            setTotalStudents(6); // Total de alunos
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

    // Dados para o gráfico (somente os alunos que têm professor)
    const dataProfessores = {
        data: [myStudents / totalStudents],
    };

    // Configuração do gráfico
    const chartConfigProfessores = {
        backgroundGradientFrom: "#FDEAE2",
        backgroundGradientTo: "#FDEAE2",
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Verde para alunos com professor
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
            <Text style={styles.title}>Dashboard do Professor</Text>
            <Text style={styles.subTitle}>Bem-vindo(a), {decoded.email}!</Text>

            <View style={styles.chartContainer}>
                <ProgressChart
                    data={dataProfessores}
                    width={screenWidth * 0.6} // Ajustado para ocupar o centro
                    height={200}
                    strokeWidth={16}
                    radius={50}
                    chartConfig={chartConfigProfessores}
                    hideLegend={true} // Esconde legenda para customizar abaixo
                />

                {/* Label personalizada abaixo do gráfico */}
                <Text style={styles.statsText}>
                    Meus alunos: {myStudents} / {totalStudents}
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
