import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import MailTypes from "./components/views/MailTypes/MailTypes";
import Mails from "./components/views/Mails/Mails";
import MailBody from "./components/views/MailBody/MailBody";

export default function App() {
  const [activeMailTypeIndex, setActiveMailTypeIndex] = useState(0);
  const [activeMailBodyIndex, setActiveMailBodyIndex] = useState(0);

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "replace":
        return {
          ...action.payload.value,
        };
      case "setMail":
        return setMail(state, action);
      default:
        throw new Error("No action matched!");
    }
  };

  const setMail = (state, action) => {
    const { payload } = action;
    const { mailTypeIndex, mailIndex, mail } = payload.value;
    return {
      ...state,
      mailTypes: state.mailTypes.map((mailType, index) => {
        if (index === mailTypeIndex) {
          return {
            ...mailType,
            mails: mailType.mails.map((mailItem, mailItemIndex) => {
              if (mailItemIndex === mailIndex) {
                return mail;
              }
              return mailItem;
            }),
          };
        }
        return mailType;
      }),
    };
  };

  const [state, dispatch] = useReducer(reducerFunction, {});

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/assets/data/db.json`)
      .then((response) => {
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
      <Mails
        mails={mails}
        setActiveMailBodyIndex={setActiveMailBodyIndex}
        activeMailTypeIndex={activeMailTypeIndex}
        dispatch={dispatch}
      />
      <MailBody activeMailBody={activeMailBody} />
    </div>
  );
}