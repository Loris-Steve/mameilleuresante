import React, { useState, useEffect } from 'react';
import AutoCompleteInputSelectComponent from './AutocompleteInputSelect';
import AutoCompleteInputTextComponent from './AutocompleteInputText';
import { ResultType } from '../enums/ResultType.enum';
import { QueryModel } from '../models/QueryModel';
import './autocomplete.scss'
import { useHistory } from 'react-router-dom';
import { ingredientList } from '../app/ingredientList';
import { AutocompleteItem } from '../models/Autocomplete';
import { recipeList } from '../app/recipeList';
import { sicknessList } from '../app/sicknessList';


function SearchForm(props: any) {
  //const [resultType, setResultType] = useState<ResultType>(ResultType.INGREDIENT);
  const [listElement, setListElement] = useState<any[]>([]);

  const [query, setQuery] = useState<QueryModel>(
    { id: undefined, resultType: ResultType.INGREDIENT, name: '' });
  const history = useHistory();

  const accountTypeRef = React.createRef<HTMLButtonElement>();
  const critereListRef = React.createRef<HTMLInputElement>();

  const setResultType = (resultType: ResultType) => {
    //props.props.history.push('/'+resultType.toLowerCase())
    //props.props.history.push("/recette");
    switch (resultType) {
      case ResultType.INGREDIENT:
        setListElement(listToAutocompleteItemList(resultType, ingredientList));
        break;
      case ResultType.RECETTE:
        setListElement(listToAutocompleteItemList(resultType, recipeList));
        break;
      case ResultType.MALADIE:
        setListElement(listToAutocompleteItemList(resultType, sicknessList));
        break
    }

    setQuery({ ...query, resultType })
    history.push('/'+resultType.toLowerCase())

  }
  // return true if string contain other string
  const compareString = (text: string, text2: string): boolean => {
    if (text.length && text2.length)
      return text.toUpperCase().includes(text2.toUpperCase());
    return false;
  }

  const listToAutocompleteItemList = (resultType: ResultType, listEl: any[]): AutocompleteItem[] => {
    let newList: AutocompleteItem[];
    switch (resultType) {
      case ResultType.INGREDIENT:
        newList = listEl.map((ing,pos) => { return { code: "ingredientName", value: ing.ingredientName, data: pos } });
        break;
      case ResultType.RECETTE:
        newList = listEl.map((recip,pos) => { return { code: "recipeName", value: recip.recipeName, data: pos } });
        break;
      case ResultType.MALADIE:
        //console.log(ResultType.MALADIE, 'list :>> ', listEl);
        newList = listEl.map((sick,pos) => { return { code: "sicknessName", value: sick.sicknessName, data: pos } });
        break;
      default:
        newList = [];
        break;
    }

    //console.log(resultType, 'list :>> ', newList);

    return newList;
  }

  const searchInAutocompleteList = (value: string, items: AutocompleteItem[],): AutocompleteItem[] => {
    return items.filter(it => compareString(it.value, value));
  }

  const changeElementSearch = (id: number) => {
    //searchInAutocompleteList(value, listElement);

    setQuery({ ...query, id})
    //console.log('id :>> ', id);
    history.push('/'+query.resultType.toLowerCase()+'/' + id)

  }


  const search = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("search");
    if (query.id) {

      if (query.name) {

      }
      else {
        alert("Le nom ne doit pas être null")
      }

      history.push('/'+query.resultType.toLowerCase()+'/' + query.id);
    }
    else {
      alert("Aucun élément renseigné")
    }

  }

  useEffect(() => {
    setResultType(query.resultType);
  },[])

  return (
    <div className='container p-4 d-md-flex justify-content-center '>
      <form onSubmit={search} className="col-md-9 col-12 d-md-flex flex-md-equal my-md-3 ps-md-3 justify-content-center p-3 bg-form">

        <div className='col-md-3 col-12 p-2'>
          <AutoCompleteInputSelectComponent
            propsInput={{
              tabIndex: 1, ref: accountTypeRef,
              value: query.resultType,
              name: "resultType",
            }}
            propsList={{
              show: true,
              tabIndex: 2,
              items: Object.keys(ResultType).map((at: string) => {
                return { code: at, value: Object(ResultType)[at], data: at }
              }),
              selectItem: (at: ResultType) => setResultType(at)
            }}
          />
        </div>

        <div className='col-md-9 col-12 p-2'>
          <AutoCompleteInputTextComponent
            onChange={(nameQuery: string) => setQuery({ ...query, name: nameQuery })}
            propsInput={{
              tabIndex: 2, ref: critereListRef,
              value: query.name,
              name: "name", placeholder: query.resultType.toLowerCase() + "..."
            }}
            propsList={{
              //show:autocomplete && critereIsFocus,
              tabIndex: 2,
              show: true,
              items: !query.name ? listElement : searchInAutocompleteList(query.name, listElement),
              selectItem: (id: number) => changeElementSearch(id)
            }}
          />
        </div>

        {/* <div className='col-3 d-flex justify-content-center align-items-center'>
            <button className='btn btn-secondary '>rechercher</button>
          </div> */}

      </form>

    </div>
  )
}

export default SearchForm