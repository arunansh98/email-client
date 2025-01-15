import { render, screen } from "@testing-library/react";
import MailBody from "./MailBody";

test("expect description of mailBody to be rendered exactly as provided in the props", () => {
  const activeMailBody = {
    description: "Thank you for signing up. We hope you enjoy the experience.",
  };
  render(<MailBody activeMailBody={activeMailBody} />);

  const text = screen.getByText(new RegExp(activeMailBody.description, "i"));

  console.log(text);

  expect(text).toBeInTheDocument();
  expect(text.textContent).toBe(activeMailBody.description);
});
