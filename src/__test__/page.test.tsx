// Home.test.tsx
import { render, act } from "@testing-library/react";

import * as NextNavigation from "next/navigation";

import "@testing-library/jest-dom";

import HomePage from "@/app/[locale]/home/page";

jest.mock("next/navigation");

describe("Home", () => {
  it("redirects to /login", async () => {
    render(<HomePage />);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(NextNavigation.redirect).toHaveBeenCalledWith("/login");
  });
});
