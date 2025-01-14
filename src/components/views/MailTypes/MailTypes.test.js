import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MailTypes from "./MailTypes";

test("render exact number of mailTypes as provided in the props", () => {
  const mailTypes = [
    {
      label: "Inbox",
    },
    {
      label: "Sent",
    },
    {
      label: "Favourites",
    },
    {
      label: "Spam",
    },
  ];
  render(<MailTypes mailTypes={mailTypes} />);

  const headings = screen.getAllByRole("heading");

  expect(headings).toHaveLength(mailTypes.length);
});

test("ensure that setActiveMailTypeIndex function is called with correct arguments on every mailType heading click", async () => {
  const mailTypes = [
    {
      label: "Inbox",
    },
    {
      label: "Sent",
    },
    {
      label: "Favourites",
    },
    {
      label: "Spam",
    },
  ];

  const setActiveMailTypeIndex = jest.fn();

  render(
    <MailTypes
      mailTypes={mailTypes}
      setActiveMailTypeIndex={setActiveMailTypeIndex}
    />
  );

  for (let i = 0; i < mailTypes.length; i++) {
    const mailType = mailTypes[i];

    const { label } = mailType;

    const heading = screen.getByRole("heading", {
      name: new RegExp(label, "i"),
    });

    await userEvent.click(heading);

    expect(setActiveMailTypeIndex).toHaveBeenCalled();
    expect(setActiveMailTypeIndex).toHaveBeenCalledWith(i);
  }
});
