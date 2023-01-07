import { ResultType } from "../enums/ResultType.enum";

export interface QueryModel {
    id : number | undefined,
    resultType : ResultType
    name : string,
}