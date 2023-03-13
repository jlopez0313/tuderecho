import React, { useEffect, useState } from 'react'

export const usePublicacion = (newPubli) => {
    const [totalComments, setTotalComments] = useState(0)
    const [totalLikes, setTotalLikes] = useState(0)
    

    const countComments = (myPubli) => {
        let total = 0
        if ( !myPubli.comentarios || myPubli.comentarios.length == 0 ) {
            return 0;
        } else {
            myPubli.comentarios.forEach(comentario => {
                total++;
                total += countComments(comentario)
            });
        }
        setTotalComments( total )
    }

    const countLikes = (myPubli) => {
        setTotalLikes( myPubli.likes?.length )
    }

    useEffect(() => {
        countComments(newPubli)
        countLikes(newPubli)
    }, [newPubli])
    
    return {
        totalComments,
        totalLikes,
    }
}
