import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/theme';
import { LoginScreen } from '@screens/LoginScreen';
import { RegisterScreen } from '@screens/RegisterScreen';
import { EnrollmentSummaryScreen } from '@screens/EnrollmentSummaryScreen';
import { SubjectSelectionScreen } from '@screens/SubjectSelectionScreen';
import { EnrollmentScreen } from '@screens/EnrollmentScreen';
import { AllSubjectsScreen } from '@screens/AllSubjectsScreen';

const Stack = createNativeStackNavigator();

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.onBackground,
    border: theme.colors.primaryVariant,
  },
};

export default function Index() {
  return (
    <NavigationContainer theme={darkTheme}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
         }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Enrollment" component={EnrollmentScreen} />
        <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
        <Stack.Screen name="EnrollmentSummary" component={EnrollmentSummaryScreen} />
        <Stack.Screen name="AllSubjects" component={AllSubjectsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

