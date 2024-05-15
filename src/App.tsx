import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login"
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useToken } from "./global/hooks";
import NoInternetPage from "./Pages/NoInternetPage";
import { Offline, Online } from "react-detect-offline";
import InternetDetector from "./Services/InternetDetector/InternetDetector";
interface RequireAuthType {
  children: JSX.Element
}

const App = () => {
  return (
    <>
      {/* <Online> */}
        <Routes>
          <Route path="admin/dashboard/login" element={<Login />} />
          <Route path="*" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>} />
        </Routes>
      {/* </Online> */}
      {/* <Offline>
        <NoInternetPage />
      </Offline> */}
      <InternetDetector />
    </>
  )
}

function RequireAuth({ children }: RequireAuthType) {
  const { Token, checking } = useToken();
  let location = useLocation();
  if (checking)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress sx={{ color: "#808C96" }} />
      </Grid>
    );
  if (!Token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/admin/dashboard/login" state={{ from: location }} />;
  }

  return children;
}

export default App
