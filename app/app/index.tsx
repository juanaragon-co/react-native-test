import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '@/firebase-config'
import { TextInput, Button } from 'react-native-paper'
import { useNavigation } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(UserCredential => {
        navigation.navigate('home')
        console.log('account create')
        console.log('user', UserCredential)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(UserCredential => {
        navigation.navigate('home')
        console.log('login')
        console.log('user', UserCredential)
      })
      .catch(error => {
        console.log('error', error)
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleLogin} buttonColor='red'>Login</Button>
      <Button onPress={handleCreateAccount} buttonColor='red'>Crear cuenta</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
