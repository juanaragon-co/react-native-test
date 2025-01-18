// jest.setup.js
//
import 'react-native-gesture-handler/jestSetup';
import { jest } from '@jest/globals';

// Mock para Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  initializeAuth: jest.fn(),
}));

// Mock para Firebase App
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

// Mock para expo-router
jest.mock('expo-router', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock para el hook useAuth
jest.mock('@/app/hooks/useAuth', () => {
  return jest.fn(() => ({
    email: '',
    setEmail: jest.fn(),
    password: '',
    setPassword: jest.fn(),
    error: null,
    alertVisible: false,
    hideAlert: jest.fn(),
    handleCreateAccount: jest.fn(),
    handleLogin: jest.fn(),
  }));
});

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

// Mock para react-native-paper
jest.mock('react-native-paper', () => {
  const actual = jest.requireActual('react-native-paper');
  return {
    ...actual,
    Portal: {
      Host: jest.fn(({ children }) => children),
    },
  };
});

// Mock para expo-font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
  isLoading: jest.fn(() => false),
  processFontFamily: jest.fn(() => 'System'),
}));



