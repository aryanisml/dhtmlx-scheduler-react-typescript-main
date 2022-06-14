import React from "react";
import "./Messages.css";

const Messages = (props:any) => {
  const { messages } = props;

  return (
    <div className="message-area">
      <h3>Messages:</h3>
    </div>
  );
};

export default Messages;
