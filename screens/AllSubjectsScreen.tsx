import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import Subject from '@model/subject';
import { db } from '@config/firebase';
import { theme } from '@/theme';
import { Button } from '@components/Button';

export function AllSubjectsScreen({ navigation }: any) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const subjectsCollection = collection(db, 'subjects');

      const subjectsSnapshot = await getDocs(subjectsCollection);
      const subjectsList = subjectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subject));
      setSubjects(subjectsList);
    } catch (error) {
      console.error('Failed to load subjects:', error);
      Alert.alert('Error', 'Failed to load subjects');
    }
    };
    
    const handleBack = () => {
        navigation.goBack();
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Available Subjects</Text>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subjectItem}>
            <Text style={styles.subjectName}>{item.name}</Text>
            <Text style={styles.subjectCredits}>{item.credits} credits</Text>
          </View>
        )}
        style={styles.list}
          />
          <Button title="Back" variant="secondary" onPress={handleBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginTop: "6%"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    marginBottom: theme.spacing.lg,
  },
  list: {
    flex: 1,
  },
  subjectItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  subjectCredits: {
    fontSize: 14,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },
});

