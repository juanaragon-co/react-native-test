import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '@/app/index';
import useAuth from '@/app/hooks/useAuth';

jest.mock('@/app/hooks/useAuth');

const mockUseAuth = useAuth as jest.Mock;

describe('LoginScreen', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      email: '',
      setEmail: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      error: '',
      alertVisible: false,
      hideAlert: jest.fn(),
      handleCreateAccount: jest.fn(),
      handleLogin: jest.fn(),
    });
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    expect(getByText('Bienvenido')).toBeTruthy();
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByText('Iniciar sesión')).toBeTruthy();
    expect(getByText('Crear cuenta')).toBeTruthy();
  });

  it('calls setEmail and setPassword on input change', () => {
    const setEmail = jest.fn();
    const setPassword = jest.fn();

    mockUseAuth.mockReturnValueOnce({
      ...mockUseAuth(),
      setEmail,
      setPassword,
    });

    const { getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password');

    expect(setEmail).toHaveBeenCalledWith('test@example.com');
    expect(setPassword).toHaveBeenCalledWith('password');
  });

  it('calls handleLogin on login button press', () => {
    const handleLogin = jest.fn();

    mockUseAuth.mockReturnValueOnce({
      ...mockUseAuth(),
      handleLogin,
    });

    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText('Iniciar sesión'));

    expect(handleLogin).toHaveBeenCalled();
  });

  it('calls handleCreateAccount on create account button press', () => {
    const handleCreateAccount = jest.fn();

    mockUseAuth.mockReturnValueOnce({
      ...mockUseAuth(),
      handleCreateAccount,
    });

    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText('Crear cuenta'));

    expect(handleCreateAccount).toHaveBeenCalled();
  });

});

