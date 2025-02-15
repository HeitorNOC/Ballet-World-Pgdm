import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDecodedToken } from '@/hooks/useDecodeToken';
import { api } from '@/lib/axios';

export default function AdminDashboard() {
  const { decoded, loading } = useDecodedToken();
  const [teachersWithStudents, setTeachersWithStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [studentsWithoutTeacher, setStudentsWithoutTeacher] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    if (!decoded) return;

    // Simulando dados mock
    setTimeout(() => {
      // Exemplo: existem 5 professores ao todo, 3 têm alunos; 
      // total de 10 alunos, 2 sem professor
      setTeachersWithStudents(3);
      setTotalTeachers(5);
      setStudentsWithoutTeacher(2);
      setTotalStudents(10);
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
      <Text style={styles.title}>Dashboard de Admin</Text>
      <Text style={styles.subTitle}>
        Bem-vindo, {decoded.email}!
      </Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Professores: {teachersWithStudents}/{totalTeachers} possuem alunos
        </Text>
        <Text style={styles.statsText}>
          Alunos sem professor: {studentsWithoutTeacher}
        </Text>
        <Text style={styles.statsText}>
          Total de alunos: {totalStudents}
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
    marginVertical: 5,
  },
});
