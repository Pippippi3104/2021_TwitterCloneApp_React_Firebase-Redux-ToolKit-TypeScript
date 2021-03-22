import React, { useEffect } from "react";
import "./App.module.css";

/* redux */
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";

/* firebase */
import { auth } from "./firebase";
import Feed from "./components/Feed";
import Auth from "./components/Auth";

/* FC = functional component */
const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    /* authStateに変更があった時反応する */
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    /* cleanup、アンマウント時の対応 */
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      {/* ログイン有無の判定 */}
      {user.uid ? (
        <div className="app">
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
