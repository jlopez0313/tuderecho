import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './Button.module.scss';

export const Button = forwardRef(
  ({ className = '', component, icon, showDot = false, onHideShow}, ref) => {

    useImperativeHandle( ref, () => 
      ({
        childFunction1() {
          setShow( false );
        },
      })
    )

    const [show, setShow] = useState(false)

    const doToggleShow = () => {
      onHideShow();
      setTimeout( () => {
        setShow( !show );
      }, 100)
    }

    return (
      <>
          <button className={`btn me-3 position-relative ${ className }`} onClick={() => doToggleShow() }>
            {
              showDot && <span className={`bg-danger text-white ${styles.badget}`}></span>
            }
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
)
