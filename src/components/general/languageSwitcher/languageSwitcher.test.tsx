// react
import { render, screen } from "@testing-library/react";

// components
import LanguageSwitcher from "./languageSwitcher";

// types
import { languageNamesMap } from "./languageSwitcher";

const initLanguage = "en";

vi.mock("react-i18next", async () => {
  const actual = await vi.importActual<any>("react-i18next");
  return {
    ...actual,
    useTranslation: () => ({
      i18n: {
        language: initLanguage,
      },
    }),
  };
});

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    render(<LanguageSwitcher />);
  });

  test.each(Object.values(languageNamesMap))(
    "renders all available languages",
    (lang) => {
      expect(screen.getByText(lang)).toBeInTheDocument();
    }
  );

  describe("active tab logic", () => {
    test("active tab has 'active' class", () => {
      const activeTab = screen.getByText(initLanguage);
      expect(activeTab).toHaveClass("active");
    });

    test.each(
      Object.values(languageNamesMap).filter((lang) => lang !== initLanguage)
    )("tab '%s' has no 'active' class if not selected", (lang) => {
      const tab = screen.getByText(lang);
      expect(tab).not.toHaveClass("active");
    });
  });
});
