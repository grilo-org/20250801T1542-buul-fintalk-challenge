import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar Component", () => {
  it("renders the Avatar component with an image", () => {
    render(<Avatar title="John Doe" src="https://example.com/avatar.jpg" />);
    const avatarRoot = screen.getByTestId("avatar-root");
    expect(avatarRoot).toBeInTheDocument();
  });
});
