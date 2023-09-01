import React, { useContext } from "react";
import AlertContext from "../context/notes/alertContext";

const Alert = () => {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    return word[0].toUpperCase() + word.slice(1);
  };

  const { alert } = useContext(AlertContext);
  return (
    <div style={{ height: "45px" }}>
      {alert && (
        <div class={`alert alert-${alert.type}`} role="alert">
          <strong>{capitalize(alert.type)}!</strong> {alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
