import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase-config';

const errorMessages: { [key: string]: string } = {
  "Firebase: Error (auth/invalid-email).": "Correo electrónico inválido",
  "Firebase: Error (auth/email-already-in-use).": "El correo electrónico ya existe",
  "Firebase: Password should be at least 6 characters (auth/weak-password).": "La contraseña debe ser mínimo de 6 caracteres",
  "Firebase: Error (auth/missing-password).": "El campo contraseña no puede estar vacío",
  "Firebase: Error (auth/invalid-credential).": "Correo electrónico o contraseña inválidos",
};

interface Navigation {
  navigate: (screen: string) => void;
}

const useAuth = (navigation: Navigation) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth: Auth = getAuth(app);

  const showAlert = (message: string) => {
    setError(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleError = (error: { message: string }) => {
    const message = errorMessages[error.message] || "Error, intentalo otra vez";
    showAlert(message);
  };

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('home');
      })
      .catch(error => {
        handleError(error);
      });
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('home');
      })
      .catch(error => {
        handleError(error);
      });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    alertVisible,
    hideAlert,
    handleCreateAccount,
    handleLogin,
  };
};


export default useAuth;

