import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AddCommentIcon from "@material-ui/icons/AddComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectToggle } from "./features/ToggleSlice";
import db, { auth } from "./Firebase";

function Sidebar() {
  const [chats, setChats] = useState([]);
  const [Searchvalue, SetSearchvalue] = useState("");

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          
        }))
      )
    );
  }, []);

  const user = useSelector(selectUser);
  const toggle = useSelector(selectToggle);

  const addChat = () => {
    const chatName = prompt("enter room name");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
        seed: Math.floor(Math.random() * 5000),
      });
    }
  };

  const handleSearch = (e) => {
    SetSearchvalue(e.target.value);
  };


  return (
    <div className={`sidebar ${toggle && "toggle"}`}>
      <div className="sidebar__header">
        <div className="top">
          <Avatar src={user.photo} className="sidebar__avatar" />
          <div className="sidebar__input">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <Tippy content="add chat">
              <IconButton onClick={addChat}>
                <AddCommentIcon />
              </IconButton>
            </Tippy>
            <Tippy content = "logout">
              <IconButton onClick={() => auth.signOut()}>
                <MoreVertIcon />
              </IconButton>
            </Tippy>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div>
          <SearchIcon />
          <input type="text" placeholder="search" onChange={handleSearch} />
        </div>
      </div>

      <div className="sidebar__chats">
        {chats
          .filter((val) => {
            if (Searchvalue === "") {
              return val;
            } else if (
              val.data.chatName
                .toLowerCase()
                .includes(Searchvalue.toLowerCase())
            ) {
              return val;
            }
            return null;
          })
          .map(({ id, data: { chatName, seed } }) => (
            <SidebarChat key={id} id={id} chatName={chatName} seed={seed} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
