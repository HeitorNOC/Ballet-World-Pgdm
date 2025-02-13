import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function HistoryScreen() {
  const router = useRouter();

  // Volta para a tela "welcome"
  const goBack = () => {
    router.push("../welcome");
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={28} color="#6E4F3A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>História</Text>
        </View>
        <Image
          source={require("@/assets/images/logo_ballet_world.png")}
          style={styles.userImage}
        />
      </View>

      {/* Conteúdo principal (cards) */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Card 1 */}
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/image_ballet_1.png")}
            style={styles.cardImage}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Origem do Ballet</Text>
            <Text style={styles.cardDescription}>
              O ballet é uma forma de dança que se iniciou nas cortes do
              Renascimento italiano durante o século XV. Clique e saiba mais
              sobre sua história.
            </Text>
          </View>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/imagem_materia.png")}
            style={styles.cardImage}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Ballet Bolshoi</Text>
            <Text style={styles.cardDescription}>
              O ballet Bolshoi é uma das companhias de balé mais renomadas
              em todo o mundo, com sede no Teatro Bolshoi em Moscou, Rússia,
              fundado em 1776.
            </Text>
          </View>
        </View>

        {/* Card 3 */}
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/cisne_negro.png")}
            style={styles.cardImage}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Cisne Negro</Text>
            <Text style={styles.cardDescription}>
              O Cisne Negro é um dos balés mais icônicos do mundo, parte de
              “O Lago dos Cisnes”, composto por Piotr Ilitch Tchaikovsky.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEAE2",
  },
  // Cabeçalho
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDEAE2",
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EED3C3",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6E4F3A",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6E4F3A",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  // Conteúdo
  scrollContent: {
    padding: 20,
    paddingBottom: 20, // Ajuste conforme necessário
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  cardTextContainer: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6E4F3A",
    textAlign: "justify",
  },
});
