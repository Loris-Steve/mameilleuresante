import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipeList } from '../app/recipeList';
import SearchForm from '../components/SearchForm';
import { ApiCall } from '../models/ApiCall';
import { RecipeModel } from '../models/RecipeModel';

function RecipeDetailScreen(props: any) {
  const [recipe, setRecipe] = useState<RecipeModel>();
  const [state, setState] = useState<ApiCall>({
    results: [],
    loading: false,
    error: '',
    searched: false
  });

  const params: any = useParams();

  const search = (params: any) => {
    setState({ ...state, searched: true })

  }
  useEffect(() => {
    console.log("object ingredient", params.id);
    if (params.id) {

      const position: number = params.id;
      const rec = recipeList[position];
      console.log('ing :>> ', rec);
      setRecipe(rec);
      search(rec?.recipeName);
    }

  }, [params])

  return (
        <div className='text-center'>      <div className='container text-center pb-2'>

        <h1>Recette</h1>
      </div>
      {state.searched ?

        <div>
          {recipe ?
            <div className='container'>
              <div className="row">
                <div className='col-sm-6 col-12'>
                  <h3>{recipe.recipeName}</h3>
                  <p>
                    {recipe.description}
                  </p>

                  <p className='font-weight-bold text-left'>
                    Etapes :
                  </p>

                  <div className='border '>

                    {recipe.preparationSteps.map((step, rank) =>
                      <div key={"step" + rank + 1} className=' d-flex border-bottom'
                      >
                        <p className='p-2 border-right'>
                          {rank + 1}
                        </p>
                        <p className='p-2'>
                          {step}
                        </p>
                      </div>
                    )
                    }
                  </div>

                </div>

                <div className='col-sm-6 col-12  border rounded'>

                </div >

              </div>
            </div>
            :
            <p> Auncune recette trouvé </p>
          }
        </div> :

        <p>Vous pouvez rechercher un ingrédient, une recette de guérison ou une maladie</p>

      }

    </div>
  )
}

export default RecipeDetailScreen