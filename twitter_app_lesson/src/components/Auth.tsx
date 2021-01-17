import React, { useState } from 'react';
import "./Auth.module.css";

/* redux */
import { useDispatch } from "react-redux";

/* firebase */
import { auth, provider, storage } from "../firebase";

/* material-ui/core系 */
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Grid,
    Typography,
    makeStyles,
    Modal,
    IconButton,
    Box,
} from "@material-ui/core";

/* icon系 */
import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

/* template利用（material-uiのテンプレ） */
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth : React.FC = () => {
  const classes = useStyles();

  /* state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  /* auth周り */
  const signInEmail = async () => {
      await auth.signInWithEmailAndPassword(email, password);
  };
  const signUpEmail = async () => {
      await auth.createUserWithEmailAndPassword(email, password);
  };
  const signInGoogle = async () => {
      await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "Login" : "Register"}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              /* email regist */
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              /* password regist */
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<EmailIcon />}
              onClick={
                  isLogin
                    ? async () => {
                        try {
                            await signInEmail();
                        } catch (err) {
                            alert(err.message);
                        }
                    }
                    : async () => {
                        try {
                            await signUpEmail();
                        } catch(err) {
                            alert(err.message);
                        }
                    }
              }
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            <Grid container>
              <Grid item xs>
                  <span className="login_reset">Forgot password?</span>
              </Grid>
              <Grid item xs>
                  <span 
                    className="login_toggleMode"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                      {isLogin ? "Create new account ?" : "Back to login"}
                  </span>
              </Grid>
            </Grid>

            <Button 
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={signInGoogle}
            >
                SignIn with Google
            </Button>

          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Auth;



