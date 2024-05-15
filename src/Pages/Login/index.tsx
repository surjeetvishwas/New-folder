import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "../../store/actions/AuthAction";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useIsLoading } from "../../store/reducers/AuthReducer";
import SnackBar from "../../components/SnackBar";
import { showSnackBarInterface } from "../../types";
import { validateLogin } from "../../Services/loginValidation";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      {new Date().getFullYear()}
      {" Easy Wedding"}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  interface valuesInterface {
    email: any;
    password: any;
  }

  const [snackbar, showSnackbar] = useState<showSnackBarInterface | null>(null);
  const isLoading = useIsLoading()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: "",
    password: ""
  } as valuesInterface)

  const formValues = [
    "email",
    "password",
  ]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateLogin(values, formValues)) {
      dispatch(signIn(values))
        .then(unwrapResult)
        .then((originalPromiseResult: {} | any) => {
          const { token } = originalPromiseResult;
          if (token) { 
            localStorage.setItem("AUTH_TOKEN", token);
            navigate("/admin/dashboard", { replace: true });
            showSnackbar({
              text: "Successfully login",
              type: "success",
            });
          }
        })
        .catch((rejectedValue: any) => {
          setValues({ ...values });
          showSnackbar({
            text: "Invalid Password or email",
            type: "error",
          });
        });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={require("../../assets/logo.png")}
              alt=""
              style={{
                width: "70%",
                height: "70%",
              }}
            />

            <Typography sx={{ my: "1rem" }} component="h1" variant="h5">
              Welcome Back !
            </Typography>
            <Typography component="h1" variant="body1">
              Sign in to continue to Easy Wedding.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />

              <LoadingButton
                style={{ backgroundColor: "#808C96" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
                disabled={isLoading}
              >
                Log In
              </LoadingButton>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          <SnackBar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={!!snackbar}
            handleClose={() => {
              showSnackbar(null);
            }}
            text={snackbar?.text}
            type={snackbar?.type}
          />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;