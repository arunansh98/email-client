export default function MailTypes(props) {
  const { mailTypes, activeMailTypeIndex, setActiveMailTypeIndex } = props;
  const getUnReadMailsCount = (mails) => {
    return mails.filter((mail) => !mail.isRead).length;
  };
  return (
    <div>
      {mailTypes &&
        mailTypes?.length > 0 &&
        mailTypes.map((type, index) => {
          let mailTypesClass = "cursor-pointer w-full text-center p-[1rem]";
          if (index < mailTypes.length - 1) {
            mailTypesClass = mailTypesClass + " border-solid border-b-[1px]";
          }
          if (index === activeMailTypeIndex) {
            mailTypesClass = mailTypesClass + " font-bold";
          }
          return (
            <h1
              className={mailTypesClass}
              key={index}
              onClick={() => setActiveMailTypeIndex(index)}
            >
              {type.label}
              {type.id === "inbox" && (
                <div className="float-right">
                  {getUnReadMailsCount(type.mails)}
                </div>
              )}
            </h1>
          );
        })}
    </div>
  );
}
