import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@config/firebase';
import { theme } from '@/theme';
import { Button } from '@components/Button';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Enrollment');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Student Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.colors.onSurface + '80'}

              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={theme.colors.onSurface + '80'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
              title="Go to Register"
              onPress={() => navigation.navigate('Register')}
              variant="secondary"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.onSurface,
    padding: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    fontSize: 16,
  },
});

