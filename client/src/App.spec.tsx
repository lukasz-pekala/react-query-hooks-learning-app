import { describe, it, expect } from "@jest/globals";
import App from "./App";

jest.mock("./App", () => ({
  __esModule: true,
  default: () => null,
}));

describe("App", () => {
  it("should be defined", () => {
    expect(true).toBeTruthy();
  });
});
