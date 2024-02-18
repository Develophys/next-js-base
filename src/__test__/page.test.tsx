// Home.test.tsx
import { render, act } from "@testing-library/react";

import Home from "../app/page";
import * as NextNavigation from "next/navigation";

import "@testing-library/jest-dom";

jest.mock("next/navigation");

describe("Home", () => {
  it("redirects to /login", async () => {
    render(<Home />);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(NextNavigation.redirect).toHaveBeenCalledWith("/login");
  });
});
