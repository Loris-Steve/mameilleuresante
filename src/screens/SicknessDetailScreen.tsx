
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { remedyList } from '../app/remedyList';
import { sicknessList } from '../app/sicknessList';
import { ApiCall } from '../models/ApiCall';
import { RemedyModel } from '../models/RemedyModel';
import { SicknessModel } from '../models/SicknessModel';

function SicknessDetailScreen(props: any) {
    const [sickness, setSickness] = useState<SicknessModel>();
    const [remedies, setRemedies] = useState<RemedyModel[]>([]);

    // A utiliser pour les appels api
    const [state, setState] = useState<ApiCall>({
        results: [],
        loading: false,
        error: '',
        searched: false
    });

    const params: any = useParams();

    const remedyExist = (ingredients: SicknessModel[], ingredienName: string): boolean => {
        return ingredients.find(ing =>
            ing.sicknessName.toLowerCase().
                includes(ingredienName.toLowerCase())) ? true : false;

    }

    const getRecipIngredient = (ingr: string) => {
        setRemedies(remedyList.filter(remdy => remedyExist(remdy.sickness, ingr)));
    }

    // Foncion utiliser pour la recherche d'éléments
    const search = (params: any) => {
        setState({ ...state, searched: true })
    }

    useEffect(() => {

        // Si l'id de la maladie existe dans l'url 
        if (params.id) {
            // On récupère l'id qui correspond à sa position dans la liste "sicknessList"
            const position: number = params.id;
            // on récupère les informations de la maladie
            const sick = sicknessList[position];
            //console.log('ing :>> ', sick);

            // on récupère les remèdes qui lui sont associés
            getRecipIngredient(sick.sicknessName); // jointure
            // On met à jour la maladie courant pour que les données s'affiche
            setSickness(sick);
            // on lui dit qu'une recherche vient d'être faite (si fonctionne pas msg = "Aucune maladie trouvé" et plus "Vous pouvez sick...")
            search(sick?.sicknessName);
        }

    }, [params])

    return (
        <div className='text-center'>
            <div className='container text-center pb-2'>
                <h1>Maladie</h1>
            </div>

            {state.searched ?

                <div>
                    {sickness ?
                        <div className='container'>
                            <div className="row">
                                <div className='col-sm-6 col-12'>
                                    <div className='bg-light p-2'>

                                        <h3>{sickness?.sicknessName}</h3>
                                        <p>
                                            {sickness.description}
                                        </p>
                                    </div>
                                </div>

                                <div className='col-sm-6 col-12  border rounded p-0'>
                                    <div className='border pt-1 bg-light'><p className='font-weight-bold'>Remèdes qui le soigne</p></div>
                                    {remedies.map((remedy, pos) =>
                                        <Link key={"rec" + pos} to={'/remede/' + pos} className='btn bg-element-list col-12 border-bottom p-3'>
                                            <div>
                                                <div>{remedy.remedyName}</div>
                                                <div>{remedy.description}</div>
                                            </div>

                                        </Link>
                                    )}
                                </div >

                            </div>
                        </div>
                        :
                        <p> Auncun maladie trouvé </p>
                    }
                </div> :

                <p>Vous pouvez rechercher un ingrédient, une remede de guérison ou une maladie</p>

            }
        </div>
    )
}

export default SicknessDetailScreen