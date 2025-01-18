import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PokemonItem from '@/app/components/PokemonItem';
import { Pokemon } from '@/utils/types';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  height: 7,
  sprites: {
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
  },
};

describe('PokemonItem Component', () => {
  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(
      <PokemonItem pokemon={mockPokemon} onPress={jest.fn()} />
    );

    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByText('Height: 7')).toBeTruthy();
    const image = getByTestId(`pokemon-item-${mockPokemon.id}`);
    expect(image).toBeTruthy();
  });

  it('calls onPress when the component is pressed', () => {
    const mockOnPress = jest.fn();

    const { getByTestId } = render(
      <PokemonItem pokemon={mockPokemon} onPress={mockOnPress} />
    );

    const touchable = getByTestId(`pokemon-item-${mockPokemon.id}`);

    fireEvent.press(touchable);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(mockPokemon);
  });
});
