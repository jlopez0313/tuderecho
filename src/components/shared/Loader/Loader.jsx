import React from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';

export const Loader = () => {
  return (
    <div className="text-center mt-5">
        <Spinner animation="grow" />
    </div>
  )
}
