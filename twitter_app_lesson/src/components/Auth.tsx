import React, { useState } from 'react';
import "./Auth.module.css";
import styles from "./Auth.module.css";

/* redux */
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../features/userSlice";

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

/* modal周り */
function getModelStyle(){
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

const Auth : React.FC = () => {
  const classes = useStyles();

  /* redux */
  const dispatch = useDispatch();

  /* state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [openModel, setOpenModel] = React.useState(false);
  const [resetEmail, setResetEmail] = useState("");

  /* 関数など */
  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModel(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* filesの最初の要素だけ存在を確認する */
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      /* 初期化 */
      e.target.value = "";
    }
  };

  /* auth周り */
  const signInEmail = async () => {
      await auth.signInWithEmailAndPassword(email, password);
  };
  const signUpEmail = async () => {
      const authUser =  await auth.createUserWithEmailAndPassword(email, password);
      let url = "";
      if (avatarImage){
        const S = 
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16;
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + avatarImage.name;

        await storage.ref(`avatars/${fileName}`).put(avatarImage);
        url = await storage.ref("avatars").child(fileName).getDownloadURL();
      }
      /* stateに追加 */
      await authUser.user?.updateProfile({
        displayName: username,
        photoURL: url,
      });
      dispatch(
        updateUserProfile({
          displayName: username,
          photoUrl: url,
        })
      );
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

            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  autoFocus
                  /* usename */
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUsername(e.target.value);
                  }}
                />

                {/* ユーザーアイコン */}
                <Box textAlign="center">
                  <IconButton>
                    <label>
                      <AccountCircleIcon
                        fontSize="large"
                        className={
                          avatarImage
                            ? styles.login_addIconLoaded
                            : styles.login_addIcon
                        } 
                      />
                      <input 
                        className={styles.login_hiddenIcon}
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                    </label>
                  </IconButton>
                </Box>
              </>
            )}    

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
              disabled={
                /* 入力エラー対応 */
                isLogin
                  ? !email || password.length < 6
                  : !username || !email || password.length < 6 || !avatarImage
              }
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
                  <span 
                    className="login_reset"
                    onClick={() => setOpenModel(true)}
                  >
                    Forgot password?
                  </span>
              </Grid>
              <Grid item>
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
                startIcon={<CameraIcon />}
                className={classes.submit}
                onClick={signInGoogle}
            >
                SignIn with Google
            </Button>

          </form>

          {/* password reset */}
          <Modal open={openModel} onClose={() => setOpenModel(false)}>
              <div style={getModelStyle()} className={classes.modal}>
                <div className={styles.login_model}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="email"
                    name="email"
                    label="Reset E-mail"
                    value={resetEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setResetEmail(e.target.value);
                    }} 
                  />
                  <IconButton onClick={sendResetEmail}>
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
          </Modal>

        </div>
      </Grid>
    </Grid>
  );
}

export default Auth;



