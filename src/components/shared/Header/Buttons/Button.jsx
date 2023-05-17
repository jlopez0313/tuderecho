import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Button = ({ component, icon }) => {
  const [show, setShow] = useState(false)

  const doToggleShow = () => {
    setShow( !show )
  }

  return (
    <>
        <button className="btn me-3" onClick={() => doToggleShow() }>
            <FontAwesomeIcon icon={icon} className='' />
        </button>

        { /*component*/ }
    </>
  )
}
