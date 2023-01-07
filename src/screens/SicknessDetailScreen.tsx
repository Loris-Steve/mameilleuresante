import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sicknessList } from '../app/sicknessList';
import { ApiCall } from '../models/ApiCall';
import { SicknessModel } from '../models/SicknessModel';

function SicknessDetailScreen(props: any) {
    const [sickness, setSickness] = useState<SicknessModel>();

    // A utiliser pour les appels api
    const [state, setState] = useState<ApiCall>({
        results: [],
        loading: false,
        error: '',
        searched: false
    });

    const params: any = useParams();

    // Foncion utiliser pour la recherche d'éléments
    const search = (params: any) => {
        setState({ ...state, searched: true })
    }

    useEffect(() => {
        console.log("object sickness", params.id);
        // Si l'id de la maladie existe dans l'url 
        if (params.id) {
            // On récupère l'id qui correspond à sa position dans la liste "sicknessList"
            const position: number = params.id;
            // on récupère les informations de la maladie
            const rec = sicknessList[position];
            console.log('ing :>> ', rec);
            // On met à jour la maladie courant pour que les données s'affiche
            setSickness(rec);
            // on lui dit qu'une recherche vient d'être faite (si fonctionne pas msg = "Aucune maladie trouvé" et plus "Vous pouvez rec...")
            search(rec?.sicknessName);
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
                                    <h3>{sickness?.sicknessName}</h3>
                                    <p>
                                        {sickness.description}
                                    </p>

                                </div>

                                <div className='col-sm-6 col-12  border rounded'>
                                    {/* A compléter */}
                                    <p>information sur les recettes (medicaments)</p>
                                </div >

                            </div>
                        </div>
                        :
                        <p> Auncun maladie trouvé </p>
                    }
                </div> :

                <p>Vous pouvez rechercher un ingrédient, une recette de guérison ou une maladie</p>

            }
        </div>
    )
}

export default SicknessDetailScreen