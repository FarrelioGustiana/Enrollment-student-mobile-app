import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@config/firebase';
import Enrollment from '@model/enrollment';
import { Button } from '@components/Button';
import { theme } from '@/theme';


export function EnrollmentScreen({ navigation }: any) {
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

  const handleSelectSubjects = () => {
    if (enrollment) {
      navigation.navigate('AllSubjects');
    } else {
      navigation.navigate('SubjectSelection');
    }
  };

  const handleViewSummary = () => {
    if (enrollment) {
      navigation.navigate('EnrollmentSummary');
    } else {
      Alert.alert('No Enrollment', 'Please select subjects first.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Failed to logout:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enrollment</Text>
      <Text style={styles.subtitle}>
        {enrollment ? 'You are enrolled' : 'You are not enrolled'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title={enrollment ? "View Subjects" : "Select Subjects"}
          onPress={handleSelectSubjects}
        />
        <Button
          title="View Enrollment Summary"
          onPress={handleViewSummary}
          disabled={!enrollment}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
});

