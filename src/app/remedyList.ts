import { RemedyModel } from "../models/RemedyModel";
import { ingredientList } from "./ingredientList";
import { sicknessList } from "./sicknessList";

export const remedyList : RemedyModel[] = [
    {
        remedyName : "contre la toux",
        description : "guéri rapidement contre la toux",
        preparationSteps : ["Chauffer de l'eau et tout mettre dedans"], // liste d'étapes
        ingredients : [ingredientList[0],ingredientList[1]],
        sickness : [sicknessList[0]]
    },
]