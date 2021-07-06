import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./chatMessage.css";
import { selectToggle } from "./features/ToggleSlice";

const Message = forwardRef(({
  id,
  contents: { timestamp, Message, displayName, email, photo, uid },
},ref) => {
const user = useSelector(selectUser);
const toggle = useSelector(selectToggle);

  return (
    <>
      {toggle &&
        <div
          ref={ref}
          className={`message ${user.email === email && "message__sender"}`}
        >
          <Avatar className="message__photo" src={photo} />
          <p>{Message}</p>
          <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
      }
    </>
  );
})

export default Message;
