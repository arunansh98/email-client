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
      case "setMailStarred":
        return setMailStarred(state, action);
      case "setMailRead":
        return setMailRead(state, action);
      default:
        throw new Error("No action matched!");
    }
  };

  const setMailStarred = (state, action) => {
    const { mail } = action.payload.value;
    return {
      ...state,
      mailTypes: state.mailTypes.map((mailType) => {
        if (mailType?.id === "favourites") {
          return {
            ...mailType,
            mails: mail.isStarred
              ? [mail, ...mailType?.mails]
              : mailType?.mails?.filter((item) => item.id !== mail.id),
          };
        } else {
          return {
            ...mailType,
            mails: mailType.mails.map((item) => {
              if (item.id === mail.id) {
                return mail;
              }
              return item;
            }),
          };
        }
      }),
    };
  };

  const setMailRead = (state, action) => {
    const { mail } = action.payload.value;
    return {
      ...state,
      mailTypes: state.mailTypes.map((mailType) => {
        return {
          ...mailType,
          mails: mailType.mails.map((item) => {
            if (item.id === mail.id) {
              return mail;
            }
            return item;
          }),
        };
      }),
    };
  };

  const [state, dispatch] = useReducer(reducerFunction, {});

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/assets/data/db.json`)
      .then((response) => {
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
        activeMailTypeIndex={activeMailTypeIndex}
        setActiveMailTypeIndex={setActiveMailTypeIndex}
      />
      <hr className="border-[1px] border-solid border-[grey]" />
      <Mails
        mails={mails}
        setActiveMailBodyIndex={setActiveMailBodyIndex}
        dispatch={dispatch}
      />
      <hr className="border-[1px] border-solid border-[grey]" />
      <MailBody activeMailBody={activeMailBody} />
    </div>
  );
}
