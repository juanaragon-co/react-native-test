export const fetchPokemonDetails = async (id: number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
};
