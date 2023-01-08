import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ingredientList } from '../app/ingredientList';
import { remedyList } from '../app/remedyList';
import { ApiCall } from '../models/ApiCall';
import { IngredientModel } from '../models/IngredientModel';
import { RemedyModel } from '../models/RemedyModel';

function IngredientDetailScreen(props: any) {
    const [ingredient, setRemedy] = useState<IngredientModel>();
    const [remedys, setReceipes] = useState<RemedyModel[]>([]);

    const [state, setState] = useState<ApiCall>({
        results: [],
        loading: false,
        error: '',
        searched: false
    });
    const params: any = useParams();

    const ingredientExist = (ingredients: IngredientModel[], ingredienName: string): boolean => {
        return ingredients.find(ing =>
            ing.ingredientName.toLowerCase().
                includes(ingredienName.toLowerCase())) ? true : false;

    }

    const getRecipIngredient = (ingr: string) => {
        setReceipes(remedyList.filter(recip => ingredientExist(recip.ingredients, ingr)));
    }

    const search = (params: any) => {
        setState({ ...state, searched: true })

    }
    useEffect(() => {

        if (params.id) {

            const position: number = params.id;
            const rec = ingredientList[position];

            getRecipIngredient(rec.ingredientName); // jointure
            setRemedy(rec);
            search(rec?.ingredientName);
        }
    }, [params])

/*     const endpointUrl = 'https://dbpedia.org/sparql';

    const sparqlQuery = `PREFIX dbp:<http://dbpedia.org/property/>
        PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?plant ?nom ?Calcium ?Carbone ?Matiere_grasse ?Fibres ?Folate ?Fer ?Calories
        WHERE {
        ?plant a <http://dbpedia.org/ontology/Plant> .
        ?plant rdfs:label ?nom .
        ?plant dbp:calciumMg ?Calcium .
        ?plant dbp:carbs ?Carbone .
        ?plant dbp:fat ?Matiere_grasse .
        ?plant dbp:fiber ?Fibres .
        ?plant dbp:folateUg ?Folate .
        ?plant dbp:ironMg ?Fer .
        ?plant dbp:kj ?Calories .
        FILTER (lang(?nom) = "fr")
        } `;

    const [data, setData] = useState();

    async function searchPlant() {
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };
        const response = await fetch(fullUrl, { headers });
        const data_aw = await response.json();

        //setData(data_aw);
        //console.log('data_aw :>> ', data_aw);

    }
 */

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
                                    <div className='bg-light p-2'>

                                        <h3>{ingredient?.ingredientName}</h3>
                                        <p>
                                            {ingredient.description}
                                        </p>
                                        <div className=''>
                                            {ingredient.Image &&
                                                <div className=''>
                                                    <img className='border rounded shadow' src={ingredient.Image} alt="ingredient" />
                                                </div>
                                            }
                                            <div className='mt-4'>
                                                <p>Calcium : {ingredient.Calcium}</p>
                                                <p>MatiereGrasse : {ingredient.MatiereGrasse}</p>
                                                <p>Carbone : {ingredient.Carbone}</p>
                                                <p>Fibres : {ingredient.Fibres}</p>
                                                <p>Folate : {ingredient.Folate}</p>
                                                <p>Fer : {ingredient.Fer}</p>
                                                <p>Calories : {ingredient.Calories}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-6 col-12  border rounded p-0'>
                                    <div className='border pt-1 bg-light'><p className='font-weight-bold'>Remèdes qui en contient </p></div>
                                    {remedys.map((recip, pos) =>
                                        <Link key={"rec" + pos} to={'/remede/' + pos} className='btn bg-element-list col-12 border-bottom p-3'>
                                            <div>
                                                <div>{recip.remedyName}</div>
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

                <p>Vous pouvez rechercher un ingrédient, une remede de guérison ou une maladie</p>

            }
        </div>
    )
}

export default IngredientDetailScreen