import React, { useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/Home/Header/Header'
import { Abogados } from '@/components/Home/Abogados/Abogados'
import { Slider } from '@/components/Home/Slider/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '@/components/shared/Loader/Loader'

import {  useParams } from 'react-router-dom';
import { setTenant } from '@/helpers/helpers';
import { find } from '@/services/Settings';
import { setSettings } from '@/helpers/helpers';
import { set } from '@/store/settings/SettingsSlice';
import { findByDomain } from '@/services/Tenants';
import { byRol } from '@/services/Usuarios'

import styles from './Home.module.scss';
import ReactPaginate from 'react-paginate';


export const Home = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const { settings } = useSelector( state => state.settings );
  localStorage.removeItem('token');

  const onLoadSettings = async() => {
    const {settings} = await find();
    setSettings( settings );
    dispatch( set( settings ) )
  }

  const onGetTenant = async () => {
    try {
      /*
      if ( params.tenant ) {
        setTenant(params.tenant);
      }
      else {*/
        const tenant = await findByDomain( window.location.host )
        setTenant(tenant?.name);
      // }

      onLoadSettings()
      onList( page )

    } catch(error) { }
  }

  const onList = async (page) => {
    setLoading(true);
    setPage( page );

    const data = await byRol('Profesional', page, perPage);

    setList( data.usuarios )
    setTotalRows( Math.ceil(data.total / perPage) );
    setLoading(false);
  }

  const handlePageChange = (page) => {
    onList( page.selected + 1 );
  };
  
  useEffect( () => {
    onGetTenant()
  }, [])

  return (
    <>
      <Header />
      {
        settings?.logo ? 
        <>
          <Slider />

          <div className="row my-3 mx-0 p-0">
            {
              list.map( ( item , index) => {
                return (
                  <div className="col-sm-6 col-md-4 col-lg-3 col-12 mb-3" key={ index }>
                    <Abogados item={item}/>
                  </div>
                )
              })
            }
          </div>
          <ReactPaginate
            className={`d-flex justify-content-around my-2 pb-4 ${styles.paginator}`}
            breakLabel="..."
            nextLabel=">"
            onPageChange={ handlePageChange }
            pageRangeDisplayed={ perPage }
            pageCount={ totalRows }
            previousLabel="<"
            renderOnZeroPageCount={ null }
          />

      </> 
        : null
      }
    </>
  )
}
