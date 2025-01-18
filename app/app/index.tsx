import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import Alert from '@/app/components/Alert';
import useAuth from '@/app/hooks/useAuth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    alertVisible,
    hideAlert,
    handleCreateAccount,
    handleLogin,
  } = useAuth(navigation);

  return (
    <View style={styles.container}>
      {error && <Alert title="Error de Autenticación" content={error || ''} visible={alertVisible} onDismiss={hideAlert} />}
      <Text style={styles.header}>Bienvenido</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleLogin} buttonColor='#007BFF' textColor='#FFFFFF' style={styles.button}>Iniciar sesión</Button>
      <Button onPress={handleCreateAccount} buttonColor='#6C757D' textColor='#FFFFFF' style={styles.button}>Crear cuenta</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#E9ECEF",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#495057'
  },
  input: {
    height: 40,
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 12,
    borderRadius: 4,
  }
});

