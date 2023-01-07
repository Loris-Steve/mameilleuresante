import React from 'react';

import { AutocompleteItem } from '../models/Autocomplete';


const AutoCompleteComponent: React.FC<{
  show: boolean, items: AutocompleteItem[], selectItem: any, tabIndex: number | undefined
}> = ({ show, items, selectItem, tabIndex }) => {

  // print 2 columns
  return (show ?
    <div className="results ">
      <ul className=''>

        {items.map((item: AutocompleteItem, index: number) =>
          <li tabIndex={tabIndex} key={index + item.code}
            // className="list-group-item list-group-item-action"
            onClick={() => selectItem(item.data)} >
            {item.value}</li>
        )}

      </ul>

    </div>
    : <></>
  );

}

export default AutoCompleteComponent;