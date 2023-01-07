import React, { useEffect, useRef, useState } from 'react';
import { AutocompleteModel } from '../models/Autocomplete';

import AutoCompleteComponent from './Autocomplete';

const AutoCompleteInputSelectComponent: React.FC<{
   propsInput: any, propsList: AutocompleteModel | undefined
}> = ({ propsInput, propsList }) => {

  const [display, setDisplay] = useState(false);
  const wrapperRef: any = useRef(null);

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
      <button type="button" className='btn btn-light select-input text-center border '
        {...propsInput}
        onClick={() => setDisplay(true)}
        onFocus={() => setDisplay(true)}
      >
        {propsInput.value || propsList?.items[0]?.value}
      </button>
      {propsList &&
        <AutoCompleteComponent show={propsList.show && display} tabIndex={propsList.tabIndex}
          items={propsList.items}
          selectItem={(dt: any) => { propsList.selectItem(dt); setDisplay(false) }} />
      }

    </div>

  );

}

export default AutoCompleteInputSelectComponent;