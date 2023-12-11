import React, { useEffect, useState } from 'react'
import { madeByUser } from '@/services/Comunidades'
import { useCharts } from '@/hooks/useCharts'
import { numberFormat } from '@/helpers/numbers';
import { Loader } from '@/components/shared/Loader/Loader';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export const ComunidadesComponent = ({ id }) => {

  const { t } = useTranslation();
  const params = useParams();

  const { drawBars } = useCharts();
  const [chart1, setChart1] = useState(null)
  const [chart2, setChart2] = useState(null)
  const [chart3, setChart3] = useState(null)
  const [lista, setLista] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const onGetList = async () => {
    setIsLoading( true )
    setLista( await madeByUser( id ) )
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

    const chart = drawBars('bar1', t('charts.comunidades.sold'), t('charts.usuarios'), data1);
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

    const chart = drawBars('bar2', t('charts.comunidades.free'), t('charts.usuarios'), data1);
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

    const chart = drawBars('bar3', t('charts.total') + ': ' + Number(usersFree + usersPaid) , t('charts.usuarios'), data3);
    setChart3( chart )
  }

  useEffect(() =>{
    onGetList();
  }, []) 
  
  useEffect(() => {
    if(lista?.length > 0 ) {
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
            <div className="d-flex justify-content-center mt-3">
              <strong className='me-3'> { t('charts.sold') }: </strong>
              <span> ${ numberFormat(total) } </span>
            </div>
          
            <div className='row'>
              <div className="mt-3 col-12 col-xl-6">
                <canvas id="bar1"></canvas>
              </div>
              <div className="mt-3 col-12 col-xl-6">
                <canvas id="bar2"></canvas>
              </div>
              <div className="mt-3 col-12 col-xl-6">
                <canvas id="bar3"></canvas>
              </div>
            </div>
          </>
      }
    </>
  )
}
