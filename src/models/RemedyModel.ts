import { IngredientModel } from "./IngredientModel";
import { SicknessModel } from "./SicknessModel";

export interface RemedyModel {
    remedyName : string, // nom de la remede
    description : string, // Etapes de préparation etc...
    preparationSteps : string[], // Etapes de préparation 
    ingredients : IngredientModel[] // ingredients de la remede
    sickness : SicknessModel[] // maladie soigné
}