import React, { useEffect, useState } from 'react'
import { madeByMe } from '@/services/Comunidades'
import { useCharts } from '@/hooks/useCharts'
import { numberFormat } from '@/helpers/numbers';
import { Loader } from '@/components/shared/Loader/Loader';
import BolsaCSS from '../Bolsa.module.scss'

import { useTranslation } from 'react-i18next';

export const ComunidadesComponent = () => {

  const { t } = useTranslation();

  const { drawBars, drawDonuts } = useCharts();
  const [chart1, setChart1] = useState(null)
  const [chart2, setChart2] = useState(null)
  const [chart3, setChart3] = useState(null)
  const [lista, setLista] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const onGetList = async () => {
    setIsLoading( true )
    setLista( await madeByMe() )
    setIsLoading( false )
  }

  const onDrawSold = async () => {
    const data1 = lista.filter( item => item.gratis === 'N').map( item => {
      return {
        label: item.titulo,
        count: item.usuarios.length
      }
    })

    if ( chart1 ) {
      chart1.destroy();
    }

    const chart = drawBars('bar1', 'x', t('charts.comunidades.sold'), t('charts.usuarios'), data1);
    setChart1( chart )    
  }

  const onDrawFree = async () => {
    const data1 = lista.filter( item => item.gratis === 'S').map( item => {
      setTotal( total + ( item.usuarios.length * Number(item.precio) ) )

      return {
        label: item.titulo,
        count: item.usuarios.length
      }
    })

    if ( chart2 ) {
      chart2.destroy();
    }

    const chart = drawBars('bar2', 'x', t('charts.comunidades.free'), t('charts.usuarios'), data1);
    setChart2( chart )
  }
  
  const onDrawUsers = async () => {
    const paidList = lista.filter( item => item.gratis === 'N');
    let usersPaid = 0;
    paidList.forEach( item => {
      usersPaid += item.usuarios.length
    })

    const freeList = lista.filter( item => item.gratis === 'S');
    let usersFree = 0;
    freeList.forEach( item => {
      usersFree += item.usuarios.length
    })

    const data3 = [
      { label: t('charts.paid'), count: usersPaid },
      { label: t('charts.free'), count: usersFree },
    ]
    

    if ( chart3 ) {
      chart3.destroy();
    }

    const chart = drawDonuts('bar3',  t('charts.total'),  Number(usersFree + usersPaid), t('charts.usuarios'), data3);
    setChart3( chart )
  }

  useEffect(() =>{
    onGetList();
  }, []) 
  
  useEffect(() => {
    if(lista.length > 0 ) {
      onDrawSold();
      onDrawFree();
      onDrawUsers();
    }
  }, [lista])

  return (
    <>
      {
        isLoading ? <Loader />
        :
          <>
            <div className='row bg-light p-3'>
              <div className="mt-3 col-12 col-xl-2">
                <div className={`card ${BolsaCSS.card}`}>
                  <div className="card-body d-flex flex-column align-items-center">
                    <strong className='me-3 mt-auto'> { t('charts.sold') }: </strong>
                    <span className='mb-auto'> ${ numberFormat(total) } </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12 col-xl-4">
                <div className={`card ${BolsaCSS.card}`}>
                  <div className="card-body">
                    <canvas id="bar1"></canvas>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12 col-xl-4">
                <div className={`card ${BolsaCSS.card}`}>
                  <div className="card-body">
                    <canvas id="bar2"></canvas>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12 col-xl-2">
                <div className={`card ${BolsaCSS.card}`}>
                  <div className="card-body">
                    <canvas id="bar3"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}
