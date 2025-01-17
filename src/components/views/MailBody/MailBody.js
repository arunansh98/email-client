export default function MailBody(props) {
  const { activeMailBody } = props;
  return (
    <div>
      <h1 id="mail-body" className="text-center m-auto p-[1rem]">
        {activeMailBody?.description}
      </h1>
    </div>
  );
}
