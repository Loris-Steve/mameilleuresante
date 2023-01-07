import React, { useEffect, useRef, useState } from 'react';
import { AutocompleteModel } from '../models/Autocomplete';

import AutoCompleteComponent from './Autocomplete';

const AutoCompleteInputTextComponent: React.FC<{
  onChange:any,inputType? : string,
  propsInput: any, propsList: AutocompleteModel | undefined
}> = ({ onChange,inputType, propsInput, propsList }) => {

  const [display, setDisplay] = useState(false);
  const wrapperRef: any = useRef(null);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    let value: string = e.target.value ;
    onChange(value);
  }
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event: any) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <div ref={wrapperRef} className="wrapper">
      
        <input type={inputType || "text"} 
          autoComplete="off"
          onChange={handleChange}
          {...propsInput} 
          onClick={() => setDisplay(true)}
          onFocus={() => setDisplay(true)}
        />
        {/* {JSON.stringify(propsList ? propsList.items : "vide")} */}
        {propsList &&
        <AutoCompleteComponent show={propsList.show && display} tabIndex={propsList.tabIndex}
          items={propsList.items}
          selectItem={(dt: any) => { propsList.selectItem(dt); setDisplay(false) }} />
      }
          
      </div>

  );

}

export default AutoCompleteInputTextComponent;