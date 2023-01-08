import { SicknessModel } from "../models/SicknessModel";
import { recipeList } from "./recipeList";

export const sicknessList : SicknessModel[] = [
    {
        sicknessName : "Toux",
        description : "tousser plusieurs fois par minute",
        recettes : ["contre la toux"]
    },
    {
        sicknessName : "Mal de gorge",
        description : "tousser plusieurs fois par minute",
        recettes : ["contre la toux", "sirop"]
    },
]