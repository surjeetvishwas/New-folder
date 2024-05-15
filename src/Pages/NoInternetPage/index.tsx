import React from "react";
import WifiOffIcon from '@mui/icons-material/WifiOff';

export default function NoInternetPage() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      flexDirection: "column",
      color: "#808C96",
      textAlign: "center",
    }}>
      <span><WifiOffIcon sx={{fontSize: "100px"}}/></span>
      <h2>No connection to the internet</h2>
      <span>Check your internet connection and try again.</span>
    </div>
  );
}
