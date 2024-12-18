import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import Enrollment from '@model/enrollment';
import { auth, db } from '@config/firebase';
import { Button } from '@components/Button';
import { theme } from '@/theme';

export function EnrollmentSummaryScreen({ navigation }: any) {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    loadEnrollment();
  }, []);

  const loadEnrollment = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const enrollmentDoc = await getDoc(doc(db, 'enrollments', user.uid));
        if (enrollmentDoc.exists()) {
          setEnrollment(enrollmentDoc.data() as Enrollment);
        }
      }
    } catch (error) {
      console.error('Failed to load enrollment:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!enrollment) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No enrollment found</Text>
        <Button title="Back" onPress={handleBack} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enrollment Summary</Text>
      <Text style={styles.credits}>Total Credits: {enrollment.totalCredits}</Text>
      <FlatList
        data={enrollment.subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subjectItem}>
            <Text style={styles.subjectName}>{item.name}</Text>
            <Text style={styles.subjectCredits}>{item.credits} credits</Text>
          </View>
        )}
        style={styles.list}
      />
      <Button title="Back to Enrollment" onPress={handleBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginTop: "5%"
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

