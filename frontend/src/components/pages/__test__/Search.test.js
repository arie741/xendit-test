import { render, fireEvent, within, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "../Search";

let getByTestId;
let inputName;
let inputCountry;
let submitButton;

beforeEach(() => {
  getByTestId = render(<Search />).getByTestId;
  inputName = getByTestId("input-name");
  inputCountry = getByTestId("input-country");
  submitButton = getByTestId("submit-button");
});

describe("Search Component Test", () => {
  test("Search Initial Values Test", () => {
    expect(inputName.value).toBe("");
    expect(inputCountry.value).toBe("");
  });
});

describe("Fire event: input name", () => {
  test("Input string: 'airlangga'", async () => {
    const findByTestId = render(<Search />).findByTestId;

    await fireEvent.change(inputName, { target: { value: "airlangga" } });
    await fireEvent.click(submitButton);

    await waitFor(async () => {
      const universitiesListEl = await findByTestId("universities-list");

      await expect(universitiesListEl).toBeInTheDocument();

      const resultEl = await within(universitiesListEl).getAllByText(
        "Universitas Airlangga"
      );
      expect(resultEl).toBeTruthy();
    });
  });

  test("Input string: 'a'", async () => {
    const findByTestId = render(<Search />).findByTestId;

    await fireEvent.change(inputName, { target: { value: "a" } });
    await fireEvent.click(submitButton);

    await waitFor(
      async () => {
        const universitiesListEl = await findByTestId("universities-list");

        await expect(universitiesListEl).toBeInTheDocument();

        const resultEl = await within(universitiesListEl).getAllByTestId(
          "university-item"
        );
        expect(resultEl).toHaveLength(10);
      },    
      { timeout: 15000 }
    );
  });
});
