import { ResultType } from "../enums/ResultType.enum";

export interface QueryModel {
    lastIngredientId: number | undefined,
    lastRecipId: number | undefined,
    lastSicknessId: number | undefined,
    resultType : ResultType
    name : string,
}