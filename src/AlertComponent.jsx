"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
//import { getCookie, setCookie } from "cookie";
import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const AlertContext = createContext(null);

function AlertComponent({ children }) {
  const [alert, setAlert] = useState(null);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    if (alert?.autoClose) {
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  function handleAxiosError(err) {
    setAlert({
      severity: "error",
      prompt: err.response?.data,
      autoClose: true,
    });
  }

  function handleError(text, tp) {
    setAlert({ prompt: text, severity: tp, autoClose: true });
  }

  function dialogToUser(dialog) {
    let diaToSet = dialog;
    if (!dialog.actionButtons) {
      diaToSet = {
        ...diaToSet,
        actionButtons: [
          {
            btnName: "Close",
            func: () => {
              setDialog(null);
            },
          },
        ],
      };
    }

    setDialog(diaToSet);
  }

  function handleDialogClose() {
    setDialog(null);
  }

  return (
    <AlertContext.Provider
      value={{ handleAxiosError, dialogToUser, handleError }}
    >
      {alert != null && (
        <div className="fixed md:right-10 md:bottom-10 right-5 bottom-5 z-50">
          <Alert
            severity={alert.severity}
            action={
              <>
                {alert.href && (
                  <Button
                    color="secondary"
                    onClick={() => {
                      window.location.href = alert.href;
                    }}
                  >
                    {alert.hrefTag}
                  </Button>
                )}
                <Button color="inherit" onClick={alert.btnClick}>
                  {alert.btnTxt}
                </Button>
              </>
            }
          >
            <div className="mr-3">{alert.prompt}</div>
          </Alert>
        </div>
      )}
      {dialog != null && (
        <Dialog
          open={dialog != null}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{dialog.title}</DialogTitle>
          {dialog.content && (
            <DialogContent>
              <DialogContentText>{dialog.content}</DialogContentText>
            </DialogContent>
          )}
          {dialog.actionButtons != undefined && (
            <DialogActions>
              {dialog.actionButtons.map((action, i) => (
                <Button
                  key={i}
                  onClick={() => {
                    action.func();
                    setDialog(null);
                  }}
                >
                  {action.btnName}
                </Button>
              ))}
            </DialogActions>
          )}
        </Dialog>
      )}

      {children}
    </AlertContext.Provider>
  );
}

export { AlertContext };
export default AlertComponent;
