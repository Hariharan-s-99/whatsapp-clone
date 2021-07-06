import React from "react";
import Chat from "./Chat";
import "./whatsapp.css";
import Sidebar from "./Sidebar";

function Whatsapp() {



  return (
    <div className="whatsapp">
      <Sidebar />
       <Chat />
    </div>
  );
}

export default Whatsapp;
