export default function Mails(props) {
  const { mails, setActiveMailBodyIndex, activeMailTypeIndex, dispatch } =
    props;
  console.log({ mails });

  return (
    <div>
      {mails &&
        mails?.length > 0 &&
        mails.map((mail, index) => {
          let mailsClass = "cursor-pointer w-full text-center p-[1rem]";
          if (index < mails.length - 1) {
            mailsClass = mailsClass + " border-solid border-b-[1px]";
          }
          if (!mail.isRead) {
            mailsClass = mailsClass + " font-bold";
          }
          return (
            <h1
              className={mailsClass}
              key={index}
              onClick={() => {
                dispatch({
                  type: "setMail",
                  payload: {
                    value: {
                      mailTypeIndex: activeMailTypeIndex,
                      mailIndex: index,
                      mail: {
                        ...mail,
                        isRead: true,
                      },
                    },
                  },
                });
                setActiveMailBodyIndex(index);
              }}
            >
              {mail.title}
            </h1>
          );
        })}
      {(!mails || mails?.length === 0) && "No mails found !"}
    </div>
  );
}
