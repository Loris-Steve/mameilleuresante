import { useState, useEffect, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { ingredientList } from '../app/ingredientList';
import { ApiCall } from '../models/ApiCall';
import { IngredientModel } from '../models/IngredientModel';
//import { SparqlClient } from 'sparql-connect';

function IngredientDetailScreen(props: any) {
    const [ingredient, setRecipe] = useState<IngredientModel>();
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
            const rec = ingredientList[position];
            console.log('ing :>> ', rec);
            setRecipe(rec);
            search(rec?.ingredientName);
        }

    }, [params])
    const [data, setData] = useState<any>(null);

    // useEffect(() => {
    //   const endpointUrl = 'https://query.wikidata.org/sparql';
    //   const client = new SparqlClient(endpointUrl);

    //   const query = 
    //     `SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel
    //     WHERE
    //     {
    //       ?country wdt:P31 wd:Q3624078 .
    //       #not a former country
    //       FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}
    //       #and no an ancient civilisation (needed to exclude ancient Egypt)
    //       FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}
    //       OPTIONAL { ?country wdt:P36 ?capital } .

    //       SERVICE wikibase:label { bd:serviceParam wikibase:language "fr" }
    //     }
    //     ORDER BY ?countryLabel`
    //   ;

    //   client.query(query)
    //     .execute()
    //     .then((response: { results: { bindings: SetStateAction<null>; }; }) => {
    //       setData(response.results.bindings);
    //     });
    // {data ? data.map((item:any) => (
    //     <div key={item.country.value}>
    //       <p>{item.countryLabel.value}</p>
    //       <p>{item.capitalLabel.value}</p>
    //     </div>
    //   )) : 'Loading...'}
    // }, []);

    return (
        <div className='text-center'>
            <div className='container pb-2'>
                <h1>Ingredient</h1>
            </div>

            {state.searched ?

                <div>
                    {ingredient ?
                        <div className='container'>
                            <div className="row">
                                <div className='col-sm-6 col-12'>
                                    <h3>{ingredient?.ingredientName}</h3>
                                    <p>
                                        {ingredient.description}
                                    </p>

                                </div>

                                <div className='col-sm-6 col-12  border rounded'>

                                </div >

                            </div>
                        </div>
                        :
                        <p> Auncun ingrédient trouvé </p>
                    }
                </div> :

                <p>Vous pouvez rechercher un ingrédient, une recette de guérison ou une maladie</p>

            }
        </div>
    )
}

export default IngredientDetailScreen