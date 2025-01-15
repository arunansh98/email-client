export default function MailBody(props) {
  const { activeMailBody } = props;
  return <div className="!justify-center">{activeMailBody?.description}</div>;
}
