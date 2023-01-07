import { IngredientModel } from "./IngredientModel";
import { SicknessModel } from "./SicknessModel";

export interface RecipeModel {
    recipeName : string, // nom de la recette
    description : string, // Etapes de préparation etc...
    preparationSteps : string[], // Etapes de préparation 
    ingredients : IngredientModel[] // ingredients de la recette
    sickness : SicknessModel[] // maladie soigné
}