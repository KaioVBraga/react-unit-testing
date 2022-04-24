import {
  getAllByAltText,
  queryByText,
  render,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./index";

describe("App Component", () => {
  it("should render list items", () => {
    const { getByText } = render(
      <List initialItems={["Diego", "Rodz", "Mayk"]} />
    );

    expect(getByText("Diego")).toBeInTheDocument();
    expect(getByText("Rodz")).toBeInTheDocument();
    expect(getByText("Mayk")).toBeInTheDocument();
  });

  it("should be able to add new items to list", async () => {
    const { getByText, findByText, getByPlaceholderText } = render(
      <List initialItems={["Diego", "Rodz", "Mayk"]} />
    );

    const inputElement = getByPlaceholderText("Novo item");

    await userEvent.type(inputElement, "Bob");

    const addButton = getByText("Adicionar");

    await userEvent.click(addButton);

    expect(await findByText("Bob")).toBeInTheDocument();
  });

  it("should be able to remove items from the list", async () => {
    const { queryByText, getAllByText } = render(
      <List initialItems={["Diego", "Rodz", "Mayk"]} />
    );

    const removeButtons = getAllByText("Remover");

    await userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Diego")).not.toBeInTheDocument();
    });

    expect(queryByText("Mayk")).toBeInTheDocument();
  });
});
