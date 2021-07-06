import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import{auth,provider} from "./Firebase"
function Login() {

const signIn =() =>{
auth.signInWithPopup(provider).catch(error => alert(error));
}

  return (
    <div className="login">
      <div className="imessage__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
          alt=""
        />
        <h1> Whatsapp </h1>
      </div>
      <Button onClick={signIn}>sign in</Button>
    </div>
  );
}

export default Login;
