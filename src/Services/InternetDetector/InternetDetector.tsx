import React, { useState } from "react";
import { Detector } from "react-detect-offline";
import SnackBar from "../../components/SnackBar/index";

export default function InternetDetector() {
  const [isOnline, setIsOnline] = useState(true);
  return (
    <Detector
      render={({online}:any) => (
        <SnackBar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isOnline !== online}
          onClose={() => {
            setIsOnline(online);
          }}
          text={"No internet connection"}
          type={"error"}
        />
      )}
      polling
    />
  );
}
