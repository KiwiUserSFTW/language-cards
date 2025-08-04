import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button, {
  buttonSize,
  buttonType,
} from "@components/general/button/button";

describe("Button", () => {
  test("renders with text and icon", () => {
    render(
      <Button
        size={buttonSize.BASE}
        type={buttonType.ADD}
        value="Add"
        handleClick={() => {}}
      />
    );

    expect(screen.getByText("Add")).toBeInTheDocument();
    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("src", expect.stringContaining("add.png"));
  });

  test("calls handleClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button
        size={buttonSize.MEDIUM}
        type={buttonType.DELETE}
        value="Delete"
        handleClick={handleClick}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders only icon when onlyIcon is true", () => {
    render(
      <Button
        size={buttonSize.BASE}
        type={buttonType.EXPORT}
        onlyIcon={true}
        handleClick={() => {}}
      />
    );

    expect(screen.queryByText(/./)).toBeNull();
    expect(screen.getByRole("img")).toHaveClass("only");
  });
});
