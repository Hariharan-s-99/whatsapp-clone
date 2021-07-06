import { useEffect, useState } from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Search from "@material-ui/icons/Search";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName, selectSeed } from "./features/ChatSlice";
import db from "./Firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move"
import { useDispatch } from "react-redux";
import { selectToggle, setToggle } from "./features/ToggleSlice";
function Chat() {
  const [input, setInput] = useState("");


  const chatId = useSelector(selectChatId);
  const seed = useSelector(selectSeed);
  const user = useSelector(selectUser);
  const toggle = useSelector(selectToggle);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const chatName = useSelector(selectChatName);

  const sendMessage = (e) => {
    e.preventDefault();
if(chatId){
  db.collection("chats").doc(chatId).collection("messages").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    Message: input,
    uid: user.uid,
    photo: user.photo,
    email: user.email,
    displayName: user.displayName,
  });

  setInput("");
}
else{
  alert("select a chat room to message")
    setInput("");

}
  
  };

  return (
    <div
      className="chat"
      onClick={() =>
        window.innerWidth <= 800 && !toggle ? dispatch(setToggle()) : null
      }
    >
      {toggle && (
        <div className="chat__header">
          <div className="chat__header__info">
            {chatId && (
              <Avatar
                src={
                  chatId && `http://avatars.dicebear.com/api/bottts/${seed}.svg`
                }
              />
            )}
            <h4 className="chat__name">
              {!chatId && <h4 className="pointer"> Select a chat</h4>}
              {chatName}
              <span className="arrowDown" onClick={() => dispatch(setToggle())}>
                <IconButton>
                  <ArrowDropDownIcon />
                </IconButton>
              </span>
            </h4>
          </div>
          <div>
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      )}
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <ChatMessage key={id} id={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      {toggle && (
        <div className="chat__input">
          <IconButton>
            <InsertEmoticonIcon className="emoji" />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <form>
            <input
              type="text"
              value={input}
              placeholder="Type a message"
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>$end message</button>
          </form>
          <IconButton>
            <MicIcon className="mic" />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default Chat;
