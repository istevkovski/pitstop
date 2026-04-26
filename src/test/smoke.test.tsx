import { render, screen } from "@testing-library/react";

it("test infrastructure: vitest + RTL + jest-dom are wired", () => {
  render(<button>Click me</button>);
  expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
});
