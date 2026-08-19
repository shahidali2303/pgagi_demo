import { describe, it, expect } from "vitest";
import { newsApi } from "../newsApi";

describe("newsApi", () => {
  it("should have getNews endpoint defined", () => {
    expect(newsApi.endpoints.getNews).toBeDefined();
  });

  it("should have the correct endpoint name", () => {
    expect(newsApi.endpoints.getNews.name).toBe("getNews");
  });
});
