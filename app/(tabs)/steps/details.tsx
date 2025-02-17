import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function StepDetailsScreen() {
  const router = useRouter();
  const { name, description, videoUrl } = useLocalSearchParams();

  // Converter URL do YouTube para embed
  const embedUrl = getYouTubeEmbedUrl(videoUrl as string);

  const goBack = () => {
    router.push("../welcome");
  };

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Nome do Passo */}
      <Text style={styles.title}>{name}</Text>

      {/* Vídeo */}
      <View style={styles.videoContainer}>
        {Platform.OS === "web" ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            allowFullScreen
            style={{ borderRadius: 10 }}
          />
        ) : (
          <WebView
            source={{ uri: embedUrl }}
            allowsFullscreenVideo
            style={styles.video}
          />
        )}
      </View>

      {/* Descrição do Passo */}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

// Função para converter a URL do YouTube para embed
const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&controls=1` : url;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEAE2",
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6E4F3A",
    marginVertical: 15,
  },
  videoContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: 16,
    color: "#6E4F3A",
    marginTop: 20,
    textAlign: "justify",
  },
});
