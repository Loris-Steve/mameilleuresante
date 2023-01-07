import { useState, useEffect, SetStateAction } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ingredientList } from '../app/ingredientList';
import { recipeList } from '../app/recipeList';
import { ApiCall } from '../models/ApiCall';
import { IngredientModel } from '../models/IngredientModel';
import { RecipeModel } from '../models/RecipeModel';
//import { SparqlClient } from 'sparql-connect';

function IngredientDetailScreen(props: any) {
    const [ingredient, setRecipe] = useState<IngredientModel>();
    const [recipes, setReceipes] = useState<RecipeModel[]>([]);

    const [state, setState] = useState<ApiCall>({
        results: [],
        loading: false,
        error: '',
        searched: false
    });
    const params: any = useParams();
    
    const ingredientExist = (ingredients : IngredientModel[], ingredienName : string): boolean => {
        return ingredients.find(ing => 
            ing.ingredientName.toLowerCase().
            includes(ingredienName.toLowerCase()) ) ? true : false;

    }
    
    const getRecipIngredient = (ingr:string) => {
        setReceipes(recipeList.filter(recip => ingredientExist(recip.ingredients, ingr)));
    }

    const search = (params: any) => {
        setState({ ...state, searched: true })

    }
    useEffect(() => {
        //console.log("object ingredient", params.id);
        if (params.id) {

            const position: number = params.id;
            const rec = ingredientList[position];
            //console.log('ing :>> ', rec);
            getRecipIngredient(rec.ingredientName);
            setRecipe(rec);
            search(rec?.ingredientName);
        }
    }, [params])
    //const [data, setData] = useState<any>(null);

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

    const endpointUrl = 'https://query.wikidata.org/sparql';

const sparqlQuery = `SELECT ?country ?countryLabel ?population ?capital ?capitalLabel ?officialLanguage ?officialLanguageLabel ?president ?presidentLabel ?currency ?currencyLabel
WHERE 
{
  ?country wdt:P31 wd:Q3624078.
  ?country rdfs:label ?countryLabel.
  ?country wdt:P1082 ?population.
  ?country wdt:P36 ?capital.
  ?capital rdfs:label ?capitalLabel.
  ?country wdt:P37 ?officialLanguage.
  ?officialLanguage rdfs:label ?officialLanguageLabel.
  ?country wdt:P6 ?president.
  ?president rdfs:label ?presidentLabel.
  ?country wdt:P38 ?currency.
  ?currency rdfs:label ?currencyLabel.
  FILTER (lang(?countryLabel) = "en")
  FILTER (lang(?officialLanguageLabel) = "en")
  FILTER (lang(?capitalLabel) = "en")
  FILTER (lang(?presidentLabel) = "en")
  FILTER (lang(?currencyLabel) = "en")
}`;

    const [data, setData] = useState();

    async function requete () {
      const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery );
      const headers = { 'Accept': 'application/sparql-results+json' };
      const response = await fetch(fullUrl, { headers });
      const data_aw = await response.json();
      //var tab = dictionnaire(data_aw)   
      //setData(tab);    
      setData(data_aw);   
      console.log('data_aw :>> ', data_aw); 
   
    }
    
    useEffect(() => {   
      requete()
      }  
  , []);

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

                                <div className='col-sm-6 col-12  border rounded p-0'>
                                    <div className='border pt-1'><p>Recette</p></div>
                                {recipes.map((recip, pos) =>
                                        <Link key={"rec"+pos} to={'/recette/' + pos} className='btn btn-white col-12 border-bottom p-3'>
                                            <div>
                                                <div>{recip.recipeName}</div>
                                                <div>{recip.description}</div>
                                            </div>

                                        </Link>
                                    )}
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