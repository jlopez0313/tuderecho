import React, { useEffect, useState } from 'react'

export const useFilter = (uid, lista) => {
    
    const [filter, setFilter] = useState( 3 )
    const [filteredList, setFilteredList] = useState([])

    const onFilter = () => {
        let filteredList = []
        switch ( filter ) {
            case 1:
                filteredList = lista.filter( item => item.user?.id == uid );
                setFilteredList( filteredList )
                break;
            case 2:
                filteredList = lista.filter( item => item.user?.id != uid );
                setFilteredList( filteredList )
                break;
            case 3:
                filteredList = [...lista];
                setFilteredList( filteredList )
                break;
        }
    }

    useEffect(() => {
        onFilter()
    }, [ filter ])

    return {
        filteredList,
        setFilter,
        onFilter,
        setFilteredList
    }
}
