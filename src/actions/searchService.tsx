import { IngredientModel } from "../models/IngredientModel";

export default class PokemonService {
 
    static getPokemons(): Promise<IngredientModel[]> {
      return fetch('http://localhost:3001/pokemons')
        .then(response => response.json());
    }
   
    static getPokemon(id: number): Promise<IngredientModel|null> {
      return fetch(`http://localhost:3001/pokemons/${id}`)
        .then(response => response.json())
        .then(data => this.isEmpty(data) ? null : data);
    }
   
    static isEmpty(data: Object): boolean {
      return Object.keys(data).length === 0;
    }
  }