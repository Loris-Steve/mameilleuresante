import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { remedyList } from '../app/remedyList';
import SearchForm from '../components/SearchForm';
import { ApiCall } from '../models/ApiCall';
import { RemedyModel } from '../models/RemedyModel';


function RemedyDetailScreen(props: any) {
  const [remedy, setRemedy] = useState<RemedyModel>();
  const [tabs, setTabs] = useState<1 | 2>(1); // pour afficher les maladie associé ou les ingrédients

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
    
    if (params.id) {

      const position: number = params.id;
      const rec = remedyList[position];
      
      setRemedy(rec);
      search(rec?.remedyName);
    }

  }, [params])

  return (
    <div className='text-center'>
      <div className='container text-center pb-2'>

        <h1>Remèdes</h1>
      </div>
      {state.searched ?

        <div>
          {remedy ?
            <div className='container'>
              <div className="row">
                <div className='col-sm-6 col-12'>
                  <div className='bg-light p-2'>
                    <h3>{remedy.remedyName}</h3>

                    <p>
                      {remedy.description}
                    </p>
                  </div>

                  <p className='font-weight-bold text-left'>
                    Etapes :
                  </p>

                  <div className='border '>

                    {remedy.preparationSteps.map((step, rank) =>
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

                <div className='col-sm-6 col-12  border rounded p-0'>
                  <div className='d-flex'>
                    <button className={'col-6 ' + (tabs !== 1 ? "btn btn-light border-right border-bottom" : "btn")}
                      onClick={() => setTabs(1)}
                    >
                      Maladie
                    </button>

                    <button className={'col-6 ' + (tabs !== 2 ? "btn btn-light border-left border-bottom" : "btn")}
                      onClick={() => setTabs(2)}
                    >
                      Ingredient
                    </button>
                  </div>

                  <div className=''>
                    {tabs === 1 ?
                      remedy.sickness.map((ing, pos) =>
                        <Link key={"sick" + pos} to={'/maladie/' + pos} className='btn bg-element-list col-12 border-bottom p-3'>
                          {ing.sicknessName}
                        </Link>
                      ) :
                      remedy.ingredients.map((ing, pos) =>
                        <Link key={"ing" + pos} to={'/ingredient/' + pos} className='btn bg-element-list col-12 border-bottom p-3'>
                          {ing.ingredientName}
                        </Link>
                      )
                    }
                  </div>
                </div >

              </div>
            </div>
            :
            <p> Auncune remède trouvé </p>
          }
        </div> :

        <p>Vous pouvez rechercher un ingrédient, une remède de guérison ou une maladie</p>

      }

    </div>
  )
}

export default RemedyDetailScreen