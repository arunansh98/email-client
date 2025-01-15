import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mails from "./Mails";

test("render exact number of mails as provided in the props", () => {
  const mails = [
    {
      title: "Welcome to our service",
      description:
        "Thank you for signing up. We hope you enjoy the experience.",
      isRead: false,
      isStarred: false,
    },
    {
      title: "Weekly Newsletter",
      description: "Here are the top updates and insights for the week.",
      isRead: false,
      isStarred: false,
    },
    {
      title: "Account Update",
      description: "Your account settings have been updated successfully.",
      isRead: false,
      isStarred: false,
    },
  ];

  render(<Mails mails={mails} />);

  const renderedMails = screen.getAllByRole("heading");

  expect(renderedMails).toHaveLength(mails.length);
});

test("ensure that setActiveMailBodyIndex function is called with correct arguments on every mail heading click", async () => {
  const mails = [
    {
      title: "Welcome to our service",
      description:
        "Thank you for signing up. We hope you enjoy the experience.",
      isRead: false,
      isStarred: false,
    },
    {
      title: "Weekly Newsletter",
      description: "Here are the top updates and insights for the week.",
      isRead: false,
      isStarred: false,
    },
    {
      title: "Account Update",
      description: "Your account settings have been updated successfully.",
      isRead: false,
      isStarred: false,
    },
  ];

  const setActiveMailBodyIndex = jest.fn();

  const dispatch = jest.fn();

  render(
    <Mails
      mails={mails}
      setActiveMailBodyIndex={setActiveMailBodyIndex}
      dispatch={dispatch}
    />
  );

  for (let i = 0; i < mails.length; i++) {
    const mail = mails[i];

    const { title } = mail;

    const heading = screen.getByRole("heading", {
      name: new RegExp(title, "i"),
    });

    await userEvent.click(heading);

    expect(setActiveMailBodyIndex).toHaveBeenCalled();

    expect(setActiveMailBodyIndex).toHaveBeenCalledWith(i);
  }
});

test("to test if a particular mail is clicked, then it is moved to read state", async () => {
  const mails = [
    {
      title: "Welcome to our service",
      description:
        "Thank you for signing up. We hope you enjoy the experience.",
      isRead: false,
      isStarred: false,
    },
    {
      title: "Weekly Newsletter",
      description: "Here are the top updates and insights for the week.",
      isRead: false,
      isStarred: false,
    },
  ];

  const setActiveMailBodyIndex = jest.fn();

  const dispatch = jest.fn();

  const { rerender } = render(
    <Mails
      mails={mails}
      setActiveMailBodyIndex={setActiveMailBodyIndex}
      dispatch={dispatch}
    />
  );

  const firstMail = screen.getAllByRole("heading")[0];

  expect(firstMail).toHaveClass("font-bold");

  console.log("before", firstMail);

  await userEvent.click(firstMail);

  // Update the mails array to reflect that the first mail is now read
  const updatedMails = mails.map((mail, index) =>
    index === 0 ? { ...mail, isRead: true } : mail
  );

  // Rerender the component with the updated mails array (now the first mail is read)
  rerender(
    <Mails
      mails={updatedMails}
      setActiveMailBodyIndex={setActiveMailBodyIndex}
      dispatch={dispatch}
    />
  );

  // Wait for the font-bold class to be removed after rerender
  await waitFor(() => {
    expect(firstMail).not.toHaveClass("font-bold");
  });
});
