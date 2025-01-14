import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import MailTypes from "./components/views/MailTypes";
import Mails from "./components/views/Mails";
import MailBody from "./components/views/MailBody";

export default function App() {
  const [activeMailTypeIndex, setActiveMailTypeIndex] = useState(0);
  const [activeMailBodyIndex, setActiveMailBodyIndex] = useState(0);

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "replace":
        return {
          ...action.payload.value,
        };
      default:
        throw new Error("No action matched!");
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {});

  useEffect(() => {
    axios.get("/assets/data/db.json").then((response) => {
      console.log({ response });
      dispatch({
        type: "replace",
        payload: {
          value: response.data,
        },
      });
    });
  }, []);

  if (Object.keys(state).length === 0) {
    return "Loading!";
  }

  const { mailTypes } = state;

  const { mails } = mailTypes?.[activeMailTypeIndex];

  const activeMailBody = mails?.[activeMailBodyIndex];

  return (
    <div className="main">
      <MailTypes
        mailTypes={mailTypes}
        setActiveMailTypeIndex={setActiveMailTypeIndex}
      />
      <Mails mails={mails} setActiveMailBodyIndex={setActiveMailBodyIndex} />
      <MailBody activeMailBody={activeMailBody} />
    </div>
  );
}
