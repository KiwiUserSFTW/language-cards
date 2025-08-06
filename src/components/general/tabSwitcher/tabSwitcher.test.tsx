// testing library
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// component
import TabSwitcher from "./tabSwitcher";

// types
import { tabType } from "./tabSwitcher";

// consts
const tabs: tabType[] = [
  { name: "Rabbit", button: false, onClick: vi.fn() },
  { name: "Carrot", button: true, onClick: vi.fn() },
];

describe("tabSwitcher", () => {
  const setup = (activeTab = tabs[0].name, setActiveTab = vi.fn()) => {
    render(
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
    return { setActiveTab, user: userEvent.setup() };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // render
  test("all tabs renders", () => {
    setup();
    tabs.forEach((tab) => {
      expect(screen.getByText(tab.name)).toBeInTheDocument();
    });
  });
  test("active tab has active class", () => {
    const activeTab = tabs[0].name;
    setup();
    expect(screen.getByText(activeTab)).toHaveClass("active");
  });

  // actions
  test("only calls onClick for button tab", async () => {
    const { user, setActiveTab } = await setup(tabs[0].name);

    await user.click(screen.getByText(tabs[1].name));

    expect(tabs[1].onClick).toHaveBeenCalledTimes(1);
    expect(setActiveTab).not.toHaveBeenCalled();
  });
  test("calls onClick and setActiveTab for normal tab", async () => {
    const { user, setActiveTab } = await setup(tabs[1].name);
    await user.click(screen.getByText(tabs[0].name));

    expect(tabs[0].onClick).toHaveBeenCalledTimes(1);
    expect(setActiveTab).toHaveBeenCalledWith(tabs[0].name);
  });

  test("clicking active tab does nothing", async () => {
    const { user, setActiveTab } = await setup(tabs[0].name);
    await user.click(screen.getByText(tabs[0].name));

    expect(tabs[0].onClick).not.toHaveBeenCalled();
    expect(setActiveTab).not.toHaveBeenCalled();
  });
});
