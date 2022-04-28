import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";

import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import ServerError from "../../components/messages/error/ServerError";
import api from "../../utils/api";
import jwt_decode from "jwt-decode";
import { strings } from "../../localization/localization";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up("xl")]: {
      paddingTop: theme.spacing(10),
    },
    height: "calc(100vh-64px)",
    marginTop: 50,
  },
  paper: {
    height: "calc(100%-64px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(5),
  },
  textFieldRoot: {
    "& .MuiFormLabel-root": {
      fontSize: theme.font.fontSize.small,
    },
  },
  textFieldRootWithSpacing: {
    marginTop: theme.spacing(4),
    "& .MuiFormLabel-root": {
      fontSize: theme.font.fontSize.small,
    },
  },
  textField: {
    fontSize: theme.font.fontSize.large,
  },
  submit: {
    margin: theme.spacing(4, 0),
    fontSize: theme.font.fontSize.medium,
    height: 40,
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      fontSize: theme.font.fontSize.small,
    },
  },
  message: { fontSize: theme.font.fontSize.small },
  loginAlert: {
    marginBottom: theme.spacing(2),
  },
}));

const LoginSchema = Yup.object({
  email: Yup.string()
    .email(strings.formatString(strings.signInEmailError))
    .required(strings.formatString(strings.signInEmailRequired)),
  password: Yup.string().required(
    strings.formatString(strings.signInPasswordRequired)
  ),
});

export default function Login({ setLoggedUser, handleChangeLanguage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [loginError, setLoginError] = useState({ error: false, message: "" });
  const [isServerError, setIsServerError] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleSignInFormSubmit(values);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseAlert = () => {
    setLoginError({ ...loginError, error: false });
  };

  const handleSignInFormSubmit = (values) => {
    const { email, password } = values;

    const postLogin = async () => {
      setIsFetching(true);
      await api
        .post("/users/login", { email, password })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          const decoded = jwt_decode(data.token);
          api
            .get(`/users/${decoded.sub}`)
            .then(({ data }) => {
              localStorage.setItem("user", JSON.stringify(data));
              setLoggedUser(data.username);
              history.push("/dashboard");
            })
            .catch((err) => {
              console.log("Login user error: ", err.response);

              if (
                err.response?.status.toString().substring(0, 1) === "5" ||
                err.response === undefined
              ) {
                setIsServerError(true);
              }
            });
        })
        .catch((err) => {
          console.log("Login user error: ", err.response);

          if (
            err.response?.status.toString().substring(0, 1) === "5" ||
            err.response === undefined
          ) {
            setIsServerError(true);
          } else {
            setLoginError({
              error: true,
              message: strings.formatString(strings.signInError),
            });
          }
        })
        .finally(() => {
          setIsFetching(false);
        });
    };

    postLogin();
  };

  return (
    <>
      <Topbar login handleChangeLanguage={handleChangeLanguage} />
      {isServerError ? (
        <ServerError />
      ) : (
        <>
          <Container
            className={classes.container}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography component="h1" variant="h4">
                {strings.formatString(strings.signInTitle)}
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={formik.handleSubmit}
              >
                {loginError.error && (
                  <Alert
                    severity="error"
                    className={classes.loginAlert}
                    classes={{ message: classes.message }}
                    onClose={handleCloseAlert}
                  >
                    <AlertTitle classes={{ root: classes.message }}>
                      {strings.formatString(strings.signInAlert)}
                    </AlertTitle>
                    {loginError.message}
                  </Alert>
                )}

                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  className={classes.textFieldRoot}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    {strings.formatString(strings.signInEmail)}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="email"
                    value={formik.email}
                    onChange={formik.handleChange("email")}
                    error={formik.errors.email ? true : false}
                    classes={{
                      root: classes.textField,
                    }}
                    labelWidth={80}
                  />
                </FormControl>
                {formik.errors.email && (
                  <FormHelperText
                    error
                    variant="filled"
                    classes={{
                      error: classes.error,
                    }}
                  >
                    {formik.errors.email.includes("e-mail")
                      ? strings.formatString(strings.signInEmailError)
                      : strings.formatString(strings.signInEmailRequired)}
                  </FormHelperText>
                )}

                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  className={classes.textFieldRootWithSpacing}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    {strings.formatString(strings.signInPassword)}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={formik.password}
                    onChange={formik.handleChange("password")}
                    error={formik.errors.password ? true : false}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <Visibility fontSize="large" />
                          ) : (
                            <VisibilityOff fontSize="large" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    classes={{
                      input: classes.textField,
                    }}
                    labelWidth={50}
                  />
                </FormControl>
                {formik.errors.password && (
                  <FormHelperText
                    error
                    variant="filled"
                    classes={{
                      error: classes.error,
                    }}
                  >
                    {strings.formatString(strings.signInPasswordRequired)}
                  </FormHelperText>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isFetching}
                  endIcon={
                    isFetching && (
                      <CircularProgress color="secondary" size="25px" />
                    )
                  }
                >
                  {strings.formatString(strings.signInButton)}
                </Button>
              </form>
            </div>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
