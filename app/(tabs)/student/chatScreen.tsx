import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { io } from "socket.io-client";
import { api } from "@/lib/axios";
import { useDecodedToken } from "@/hooks/useDecodeToken";

const socket = io("http://localhost:3001");

interface Message {
  sender_id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function ChatScreen() {
  const router = useRouter();
  const { decoded, loading: loadingUser } = useDecodedToken();
  const { userId: receiverId } = useLocalSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [senderData, setSenderData] = useState<{
    id: string;
    role: string;
    name: string;
  } | null>(null);
  const [receiverData, setReceiverData] = useState<{
    id: string;
    role: string;
    name: string;
  } | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const sender_id = decoded?.sub;

  useEffect(() => {
  if (!sender_id || !receiverId) return;

  // Conectar ao socket apenas quando entrar na tela
  socket.connect();

  async function fetchUserData() {
    try {
      setLoadingMessages(true);

      const senderResponse = await api.post("/user", { id: sender_id });
      if (!senderResponse.data) throw new Error("Usuário não encontrado.");
      setSenderData({
        id: senderResponse.data.id,
        role: senderResponse.data.userType,
        name: senderResponse.data.name,
      });

      const receiverResponse = await api.post("/user", { id: receiverId });
      if (!receiverResponse.data) throw new Error("Usuário não encontrado.");
      setReceiverData({
        id: receiverResponse.data.id,
        role: receiverResponse.data.userType,
        name: receiverResponse.data.name,
      });

      socket.emit("register", {
        userId: senderResponse.data.id,
        role: senderResponse.data.userType,
      });

      socket.emit("openChat", {
        userId: senderResponse.data.id,
        contactId: receiverResponse.data.id,
      });

      socket.on("chatHistory", (history: Message[]) => {
        setMessages(history);
        setLoadingMessages(false);
        scrollToBottom();
      });

      socket.on("receiveMessage", ({ sender_id, message }: Message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender_id: sender_id,
            message,
            timestamp: new Date().toISOString(),
            read: false,
          },
        ]);
        scrollToBottom();
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      Alert.alert("Erro", "Não foi possível carregar o chat.");
    }
  }

  fetchUserData();

    return () => {
      console.log("🔴 Desconectando socket...");
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.disconnect();
      setMessages([]);
    };
  }, [sender_id, receiverId]);


  const sendMessage = () => {
    if (message.trim() && senderData && receiverData) {
      socket.emit("sendMessage", {
        sender_id: senderData.id,
        receiverId: receiverData.id,
        message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_id: senderData.id,
          message,
          timestamp: new Date().toISOString(),
          read: true,
        },
      ]);
      setMessage("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const goBack = () => {
    router.push("../welcome");
  };

  if (loadingUser || !senderData || !receiverData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6E4F3A" />
        <Text style={styles.loadingText}>Carregando chat...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat com {receiverData.name}</Text>
      </View>

      {loadingMessages ? (
        <View style={styles.loadingMessages}>
          <ActivityIndicator size="large" color="#6E4F3A" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const isSentByUser = item.sender_id == senderData?.id;
            console.log(item.sender_id, senderData?.id)
            return (
              <View
                style={[
                  styles.messageContainer,
                  isSentByUser ? styles.sentMessage : styles.receivedMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.message}</Text>
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            );
          }}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome5 name="paper-plane" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDEAE2", paddingTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: { marginRight: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#6E4F3A" },
  
  messageContainer: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "75%",
  },

  sentMessage: {
    backgroundColor: "#d97777",
    alignSelf: "flex-end",
    borderTopLeftRadius: 15,
    marginRight:20,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },

  receivedMessage: {
    backgroundColor: "#bfbfbf",
    alignSelf: "flex-start",
    borderTopLeftRadius: 15,
    marginLeft:20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },

  messageText: { 
    fontSize: 16, 
    color: "white" 
  },

  timestamp: {
    fontSize: 12,
    marginTop: 3,
    opacity: 0.7,
    color: "white",
    alignSelf: "flex-end",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#FDEAE2",
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#d97777",
    padding: 12,
    borderRadius: 50,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingMessages: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "white" },
});
