export default function MailTypes(props) {
  const { mailTypes, setActiveMailTypeIndex } = props;
  return (
    <div>
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
  );
}
