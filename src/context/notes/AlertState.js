import React, { useState } from 'react'
import AlertContext from './alertContext'

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (alertDetails) => {
        const {type, message} = alertDetails;
        setAlert({type, message});
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }

  return (
    <AlertContext.Provider value={{showAlert, alert}}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState