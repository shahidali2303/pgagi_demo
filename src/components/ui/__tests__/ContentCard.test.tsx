import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { ContentCard } from "../ContentCard";
import { ContentItem } from "@/types";

const mockContent: ContentItem = {
  id: "test-1",
  type: "news",
  title: "Test News Article",
  description: "This is a test description for the news article.",
  image: "https://example.com/image.jpg",
  category: "technology",
  source: "Test Source",
  url: "https://example.com",
};

const renderWithRedux = (component: React.ReactNode) => {
  const store = makeStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe("ContentCard", () => {
  it("renders content correctly", () => {
    renderWithRedux(<ContentCard content={mockContent} />);

    expect(screen.getByText("Test News Article")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test description for the news article."),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Source")).toBeInTheDocument();
  });

  it("toggles favorite state when heart button is clicked", async () => {
    const user = userEvent.setup();
    renderWithRedux(<ContentCard content={mockContent} />);

    const heartButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    await user.click(heartButton);

    const updatedButton = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(updatedButton).toBeInTheDocument();
  });
});
