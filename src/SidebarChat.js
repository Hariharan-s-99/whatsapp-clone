/* eslint-disable no-lone-blocks */
import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "./features/ChatSlice";
import { setToggle } from "./features/ToggleSlice";
import "./SidebarChat.css";
import * as timeago from "timeago.js";
import db from "./Firebase";

function SidebarChat({ id, chatName, seed }) {
  const dispatch = useDispatch();

  const [chatInfo, setChatInfo] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      className="sidebarchats"
      onClick={() => {
        
        {window.innerWidth <= 860 && dispatch(setToggle())}
    
          dispatch(
            setChat({
              chatId: id,
              chatName: chatName,
              seed: seed,
            })
          );
      }}
    >
      {chatName && (
        <>
          <Avatar
            src={`http://avatars.dicebear.com/api/bottts/${seed}.svg`}
            className="sidebarchats__avatar"
          />
          <div className="sidebarchats__info">
            <h3>{chatName}</h3>
            <p>
              <span>{chatInfo[0]?.displayName}</span>
              {chatInfo[0] && <span>: </span>}
              {chatInfo[0]?.Message?.substring(0, 15)}
              {chatInfo[0] && <span>.....</span>}
            </p>
            <small>
              {chatInfo[0] &&
                timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
            </small>
          </div>
        </>
      )}
    </div>
  );
}

export default SidebarChat;
