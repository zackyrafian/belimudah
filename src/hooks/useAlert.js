import { useState } from "react";

export function useAlert() { 
  const [alert, setAlert] = useState(null); 

  const showSuccess = (message) => { 
    setAlert({
      type: "success", 
      message, 
    })
  }

  const showError = (message) => { 
    setAlert({ 
      type: "error", 
      message, 
    })
  }

  const clearAlert = () => { 
    setAlert(null);
  }

  return { 
    alert, 
    showSuccess, 
    showError, 
    clearAlert, 
  }
}