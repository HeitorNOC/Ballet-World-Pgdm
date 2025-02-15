import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDecodedToken } from '@/hooks/useDecodeToken';
import { api } from '@/lib/axios';

export default function StudentDashboard() {
  const { decoded, loading } = useDecodedToken();
  const [completedCircuits, setCompletedCircuits] = useState(0);
  const [totalCircuits, setTotalCircuits] = useState(0);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    if (!decoded) return;
    
    // Simulando chamada à API ou usando dados mock
    // Aqui, substituímos por um setTimeout apenas para ilustrar
    setTimeout(() => {
      // Exemplo: o aluno completou 2 circuitos de um total de 5
      setCompletedCircuits(2);
      setTotalCircuits(5);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Aluno</Text>
      <Text style={styles.subTitle}>
        Bem-vindo, {decoded.email}!
      </Text>
      <View style={styles.statsContainer}>
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
    backgroundColor: '#FDEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6E4F3A',
  },
  text: {
    color: '#6E4F3A',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6E4F3A',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#6E4F3A',
    marginBottom: 20,
  },
  statsContainer: {
    backgroundColor: '#EED3C3',
    borderRadius: 10,
    padding: 15,
  },
  statsText: {
    color: '#6E4F3A',
    fontWeight: 'bold',
  },
});
