import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

export default function Mails(props) {
  const { mails, setActiveMailBodyIndex, dispatch } = props;
  const handleMailRead = (index, mail) => {
    dispatch({
      type: "setMailRead",
      payload: {
        value: {
          mail: {
            ...mail,
            isRead: true,
          },
        },
      },
    });
    setActiveMailBodyIndex(index);
  };

  const handleMailStarred = (mail, event) => {
    event.stopPropagation();
    dispatch({
      type: "setStarredMail",
      payload: {
        value: {
          mail: {
            ...mail,
            isStarred: !mail.isStarred,
          },
        },
      },
    });
  };

  return (
    <div>
      {mails &&
        mails?.length > 0 &&
        mails.map((mail, index) => {
          let mailsClass = "cursor-pointer w-full text-center p-[1rem]";
          if (index < mails.length - 1) {
            mailsClass = mailsClass + " border-solid border-b-[1px]";
          }
          if (!mail?.isRead) {
            mailsClass = mailsClass + " font-bold";
          }
          return (
            <h1
              className={mailsClass}
              key={index}
              onClick={() => handleMailRead(index, mail)}
            >
              {mail.title}
              <button
                className="float-right"
                onClick={(event) => handleMailStarred(mail, event)}
              >
                {mail.isStarred && <FaStar className="text-[#ffcf00]" />}
                {!mail.isStarred && <CiStar />}
              </button>
            </h1>
          );
        })}
      {(!mails || mails?.length === 0) && "No mails found !"}
    </div>
  );
}
