import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import Subject from '@model/subject';
import { auth, db } from '@config/firebase';
import Enrollment from '@model/enrollment';
import { Button } from '@components/Button';
import { theme } from '@/theme';

export function SubjectSelectionScreen({ navigation }: any) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);

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

  const handleSelectSubject = (subject: Subject) => {
    const isSelected = selectedSubjects.some((s) => s.id === subject.id);
    let newSelectedSubjects: Subject[];
    let newTotalCredits: number;

    if (isSelected) {
      newSelectedSubjects = selectedSubjects.filter((s) => s.id !== subject.id);
      newTotalCredits = totalCredits - subject.credits;
    } else {
      newTotalCredits = totalCredits + subject.credits;
      if (newTotalCredits > 24) {
        Alert.alert('Error', 'Maximum credit limit (24) exceeded');
        return;
      }
      newSelectedSubjects = [...selectedSubjects, subject];
    }

    setSelectedSubjects(newSelectedSubjects);
    setTotalCredits(newTotalCredits);
  };

  const handleConfirm = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No user logged in');
        return;
      }

      const enrollment: Enrollment = {
        studentId: user.uid,
        subjects: selectedSubjects,
        totalCredits,
      };

      await setDoc(doc(db, 'enrollments', user.uid), enrollment);
      navigation.navigate('Enrollment');
    } catch (error) {
      console.error('Failed to save enrollment:', error);
      Alert.alert('Error', 'Failed to save enrollment');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Subjects</Text>
      <Text style={styles.credits}>Total Credits: {totalCredits}/24</Text>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subjectItem}>
            <View>
              <Text style={styles.subjectName}>{item.name}</Text>
              <Text style={styles.subjectCredits}>{item.credits} credits</Text>
            </View>
            <Button
              title={selectedSubjects.some((s) => s.id === item.id) ? 'Remove' : 'Add'}
              onPress={() => handleSelectSubject(item)}
              variant={selectedSubjects.some((s) => s.id === item.id) ? 'primary' : 'secondary'}
            />
          </View>
        )}
        style={styles.list}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Selection"
          onPress={handleConfirm}
          disabled={selectedSubjects.length === 0}
        />
        
        <Button title="Back" variant="secondary" onPress={handleBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginTop: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    marginBottom: theme.spacing.md,
  },
  credits: {
    fontSize: 18,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.lg,
  },
  list: {
    flex: 1,
    marginBottom: theme.spacing.lg,
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  buttonContainer: {
    gap: theme.spacing.md,
  },
});

