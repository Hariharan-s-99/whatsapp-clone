import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout } from "./features/userSlice";
import {selectUser} from "./features/userSlice"
import { auth } from "./Firebase";
import Whatsapp from "./Whatsapp";
import Login from "./Login";

function App() {
const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(
          login({
            uid: authuser.uid,
            photo: authuser.photoURL,
            email: authuser.email,
            displayName: authuser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <div className="app">{user ? <Whatsapp/> : <Login />}</div>;
}

export default App;
