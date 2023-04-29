import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPubli } from '@/store/publicaciones/PublicacionesSlice';

export const usePublicacion = (newPubli) => {
    const dispatch = useDispatch();
    
    const [totalComments, setTotalComments] = useState(0)
    const [totalShares, setTotalShares] = useState(0)
    const [totalLikes, setTotalLikes] = useState(0)

    const { post } = useSelector( (state) => state.publicacion )
    
    const countComments = (myPubli) => {
        const total = doCount( myPubli );
        setTotalComments( total - 1 )
    }

    const doCount = ( myPubli ) => {
        // console.log( myPubli )
        if ( !myPubli.comentarios || myPubli.comentarios.length == 0 ) {
            return 1;
        }

        let total = 1;
        myPubli.comentarios.forEach(comentario => {
            total += doCount(comentario)
        });

        return total;
    }

    const onAddChild = async (comment) => {
        const updated = addChild (post, comment)
        await dispatch( setPubli( updated ) )
    }

    const addChild = ( parent, newChild )  => {
        if( parent.id === newChild.parent || parent.id == newChild.publicacion?.id) {
            const comentarios = [...parent.comentarios || null, newChild]
            return {...parent, comentarios}
        } else {
            const comentarios = [];
            parent.comentarios?.forEach( comment => {
                comentarios.push( addChild( comment, newChild ) )
            })
            return {...parent, comentarios}
        }
    }

    const onRemoveChild = async ( commentID ) => {
        const updated = removeChild (post, commentID)
        await dispatch( setPubli( updated ) )
        return updated;
    }

    const removeChild = ( parent, newChildID )  => {
        const isChild = parent.comentarios.find( comment => comment.id === newChildID)

        if( isChild ) {
            const list = parent.comentarios.filter( comment => comment.id !== newChildID)
            return {...parent, comentarios: list}
        } else {
            const comentarios = [];
            parent.comentarios?.forEach( comment => {
                const lista = removeChild( comment, newChildID )
                comentarios.push( lista )
            })
            return {...parent, comentarios}
        }
    }

    const countLikes = (myPubli) => {
        setTotalLikes( myPubli.likes?.length )
    }

    const countShares = (myPubli) => {
        setTotalShares( myPubli.shares?.length )
    }

    useEffect(() => {
        countComments(newPubli)
        countShares(newPubli)
        countLikes(newPubli)
    }, [newPubli])
    
    return {
        totalComments,
        totalShares,
        totalLikes,
        onAddChild,
        onRemoveChild
    }
}
