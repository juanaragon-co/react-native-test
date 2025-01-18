import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeScreen from '@/app/home';
import { fetchPokemonDetails } from '@/utils/api';
import { useNavigation } from 'expo-router';

jest.mock('@/utils/api');
jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (fetchPokemonDetails as jest.Mock).mockImplementation((id) =>
      Promise.resolve({ id, name: `Pokemon ${id}` })
    );
  });


  it('should render initial components correctly', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('No Favoritos')).toBeTruthy();
    expect(getByText('Favoritos')).toBeTruthy();
    expect(getByText('Cerrar sesión')).toBeTruthy();
  });

  it('should navigate to index on logout', async () => {
    const { getByText } = render(<HomeScreen />);

    // Usa act para manejar el evento fireEvent
    await act(async () => {
      fireEvent.press(getByText('Cerrar sesión'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('index');
  });

});
