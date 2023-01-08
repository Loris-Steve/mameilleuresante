import React, { useState, useEffect } from 'react';
import AutoCompleteInputSelectComponent from './AutocompleteInputSelect';
import AutoCompleteInputTextComponent from './AutocompleteInputText';
import { ResultType } from '../enums/ResultType.enum';
import { QueryModel } from '../models/QueryModel';
import './autocomplete.scss'
import { useHistory } from 'react-router-dom';
import { ingredientList } from '../app/ingredientList';
import { AutocompleteItem } from '../models/Autocomplete';
import { remedyList } from '../app/remedyList';
import { sicknessList } from '../app/sicknessList';


function SearchForm(props: any) {

  const [listElement, setListElement] = useState<any[]>([]);

  const [query, setQuery] = useState<QueryModel>(
    {
      lastIngredientId: undefined,
      lastRecipId: undefined,
      lastSicknessId: undefined,
      resultType: ResultType.INGREDIENT, name: ''
    });
  const history = useHistory();

  const accountTypeRef = React.createRef<HTMLButtonElement>();
  const critereListRef = React.createRef<HTMLInputElement>();

  const setResultType = (resultType: ResultType) => {
    let id: Number | '';

    switch (resultType) {
      case ResultType.INGREDIENT:
        setListElement(listToAutocompleteItemList(resultType, ingredientList));
        id = query.lastIngredientId !== undefined ? query.lastIngredientId : '';
        break;
      case ResultType.REMEDE:
        setListElement(listToAutocompleteItemList(resultType, remedyList));
        id = query.lastRecipId !== undefined ? query.lastRecipId : '';
        break;
      case ResultType.MALADIE:
        setListElement(listToAutocompleteItemList(resultType, sicknessList));
        id = query.lastSicknessId !== undefined ? query.lastSicknessId : '';
        break;
    }

    setQuery({ ...query, resultType, name: '' })
    history.push('/' + resultType.toLowerCase() + '/' + id)

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
        newList = listEl.map((ing, pos) => { return { code: "ingredientName", value: ing.ingredientName, data: { id: pos, text: ing.ingredientName } } });
        break;
      case ResultType.REMEDE:
        newList = listEl.map((recip, pos) => { return { code: "remedyName", value: recip.remedyName, data: { id: pos, text: recip.remedyName } } });
        break;
      case ResultType.MALADIE:
        newList = listEl.map((sick, pos) => { return { code: "sicknessName", value: sick.sicknessName, data: { id: pos, text: sick.sicknessName } } });
        break;
      default:
        newList = [];
        break;
    }

    return newList;
  }

  const searchInAutocompleteList = (value: string, items: AutocompleteItem[],): AutocompleteItem[] => {
    return items.filter(it => compareString(it.value, value));
  }

  const changeElementSearch = (data: any) => {

    const { id, text } = data;
    const newQuery = { ...query };
    switch (newQuery.resultType) {
      case ResultType.INGREDIENT:
        newQuery.lastIngredientId = id;
        break;
      case ResultType.REMEDE:
        newQuery.lastRecipId = id;
        break;
      case ResultType.MALADIE:
        newQuery.lastSicknessId = id;
        break;
    }

    newQuery.name = text;
    setQuery({ ...newQuery });

    history.push('/' + query.resultType.toLowerCase() + '/' + id)

  }


  const search = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (query.name) {
      const firstElementList: AutocompleteItem = searchInAutocompleteList(query.name, listElement)[0];
      if (firstElementList) {
        setQuery({ ...query, name: firstElementList?.data?.text })
        history.push('/' + query.resultType.toLowerCase() + '/' + firstElementList?.data?.id);
      }
      else {
      }
    }
    else {
      alert("Le nom ne doit pas être null")
    }
  }

  useEffect(() => {
    setResultType(query.resultType);
  }, [])

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
              selectItem: (data: any) => changeElementSearch(data)
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