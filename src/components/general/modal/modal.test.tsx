// testing library
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// component
import Modal from "./modal";

describe("Modal", () => {
  // render
  test("doesn't render when open is false", () => {
    const { container } = render(
      <Modal open={false} setOpen={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  test("render when open is true", () => {
    const { container } = render(
      <Modal open={true} setOpen={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  // actions
  test("calls setOpen(false) when clicking on modal-container background", async () => {
    const user = userEvent.setup();
    const setOpen = vi.fn();

    render(
      <Modal open={true} setOpen={setOpen}>
        <div>Modal content</div>
      </Modal>
    );

    await user.click(screen.getByRole("modal"));
    expect(setOpen).toHaveBeenCalledTimes(1);
  });

  // actions
  test("doesn't call setOpen() when clicking on modal-contrainer", async () => {
    const user = userEvent.setup();
    const setOpen = vi.fn();

    render(
      <Modal open={true} setOpen={setOpen}>
        <div>Modal content</div>
      </Modal>
    );

    await user.click(screen.getByRole("modal-container"));
    expect(setOpen).toHaveBeenCalledTimes(0);
  });
});
