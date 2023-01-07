export interface AutocompleteItem {
    code : string,
    value : string,
    data? : any
}

export interface AutocompleteModel {
    show: boolean,
    items: AutocompleteItem[] ,
    selectItem : any,
    tabIndex: number|undefined
}