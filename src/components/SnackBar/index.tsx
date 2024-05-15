
//@ts-nocheck
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React, { createContext, useContext, useState } from "react";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref as React.RefObject<HTMLDivElement>} variant="filled" {...props} />;
});

function SlideTransition(props:any) {
    return <Slide {...props} direction="up" />;
}

interface SnackBarContextInterface {
    snackBar: SnackBarType | null;
    setSnackBar: React.Dispatch<React.SetStateAction<SnackBarType | null>>;
  }

  interface SnackBarType {
    text: string;
    type: string;
  }

export const SnackbarContext = createContext<SnackBarContextInterface | null>(null);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({children}:any) => {
    const [snackBar, setSnackBar] = useState<SnackBarType | null>(null);

    return (
        <SnackbarContext.Provider value={{ snackBar, setSnackBar }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export default function SnackBar({
    open,
    handleClose,
    text,
    type,
    anchorOrigin = { vertical: "top", horizontal: "left" },
}:any) {
    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                {text}
            </Alert>
        </Snackbar>
    );
}
