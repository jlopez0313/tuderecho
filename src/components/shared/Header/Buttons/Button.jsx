import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './Button.module.scss';

export const Button = ({ className = '', component, icon }) => {
  const [show, setShow] = useState(false)

  const doToggleShow = () => {
    setShow( !show )
  }

  return (
    <>
        <button className={`btn me-3 ${ className }`} onClick={() => doToggleShow() }>
            <FontAwesomeIcon icon={icon} className='' />
        </button>

        { show && 
          <div className={`${styles.floatWindow}`}>
            { component }
          </div>
        }
    </>
  )
}
