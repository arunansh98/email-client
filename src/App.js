import axios from "axios";
import { useEffect, useReducer, useState } from "react";

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

  console.log({ mails });

  const activeMailBody = mails?.[activeMailBodyIndex];

  return (
    <div className="flex flex-row items-stretch h-[86vh] justify-between border-[2px] border-solid m-[3rem]">
      <div className="flex flex-col items-center justify-start border-solid border-r-[1px] h-full w-full overflow-y-scroll">
        {mailTypes &&
          mailTypes?.length > 0 &&
          mailTypes.map((type, index) => {
            let mailTypesClass = "cursor-pointer w-full text-center p-[1rem]";
            if (index < mailTypes.length - 1) {
              mailTypesClass = mailTypesClass + " border-solid border-b-[1px]";
            }
            return (
              <h1
                className={mailTypesClass}
                key={index}
                onClick={() => setActiveMailTypeIndex(index)}
              >
                {type.label}
              </h1>
            );
          })}
      </div>
      <div className="flex flex-col items-center justify-start border-solid border-r-[1px] h-full w-full overflow-y-scroll">
        {mails &&
          mails?.length > 0 &&
          mails.map((mail, index) => {
            let mailsClass = "cursor-pointer w-full text-center p-[1rem]";
            if (index < mails.length - 1) {
              mailsClass = mailsClass + " border-solid border-b-[1px]";
            }
            return (
              <h1
                className={mailsClass}
                key={index}
                onClick={() => setActiveMailBodyIndex(index)}
              >
                {mail.title}
              </h1>
            );
          })}
        {(!mails || mails?.length === 0) && "No mails found !"}
      </div>
      <div className="flex flex-col items-center justify-center h-full w-full overflow-y-scroll">
        {activeMailBody?.description}
      </div>
    </div>
  );
}
