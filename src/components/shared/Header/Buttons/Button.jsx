import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Button = ({ component, icon }) => {
  return (
    <OverlayTrigger
        rootClose
        trigger="click"
        placement="bottom"
        overlay={ component }
    >
        <button className="btn me-3">
            <FontAwesomeIcon icon={icon} className='' />
        </button>
    </OverlayTrigger>
  )
}
