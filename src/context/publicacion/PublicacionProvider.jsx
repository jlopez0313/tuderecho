import React, { useState } from 'react'
import { PublicacionContext } from './PublicacionContext'

export const PublicacionProvider = ({ children }) => {

  const [publicacion, setPublicacion] = useState();
  const [idx, setIndex] = useState();

  const expose = {
    publicacion, setPublicacion,
    idx, setIndex
  }

  return (
    <PublicacionContext.Provider value={ expose }>
        { children }
    </PublicacionContext.Provider>
  )
}