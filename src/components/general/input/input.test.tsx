// react
import { useState } from "react";

// testing library
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// component
import Input from "./input";

describe("Input", () => {
  const user = userEvent.setup();

  test("updates value on change", async () => {
    // state wrapper
    const Wrapper = () => {
      const [value, setValue] = useState<string>("");
      return <Input value={value} setValue={setValue} />;
    };

    render(<Wrapper />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Rabbit");

    expect(input).toHaveValue("Rabbit");
  });

  test("Enter key call handleAccept", async () => {
    const handleAccept = vi.fn();

    render(<Input value="" setValue={() => {}} handleAccept={handleAccept} />);

    const input = screen.getByRole("textbox");

    await user.type(input, "{enter}");

    expect(handleAccept).toHaveBeenCalledTimes(1);
  });

  test("shows placeholder when provided", () => {
    render(<Input value="" setValue={() => {}} placeholder="placeholder" />);

    const inputPlaceholder = screen.getByPlaceholderText("placeholder");
    expect(inputPlaceholder).toBeInTheDocument();
  });
});
