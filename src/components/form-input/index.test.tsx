import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormInput, { FormInputProps } from ".";

const renderFormInput = (props?: Partial<FormInputProps>) => {
  const defaultProps: FormInputProps = {
    label: "Label",
    name: "name",
    handleChange: jest.fn(),
    value: "",
  };

  render(<FormInput {...defaultProps} {...props} />);
};

describe("<FormInput />", () => {
  it("should render input by default", () => {
    renderFormInput();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("should render select when type is select", () => {
    renderFormInput({ type: "select" });

    const select = screen.getByTestId("name--select");
    const input = screen.queryByRole("textbox");

    expect(select).toBeInTheDocument();
    expect(input).not.toBeInTheDocument();
  });

  it("should render error when error is passed", () => {
    renderFormInput({ error: "Error" });

    const error = screen.getByText("Error");
    expect(error).toBeInTheDocument();

    const input = screen.queryByRole("textbox");
    expect(input).toHaveClass("form-input--error");
  });

  it("should call onChange when input is changed", () => {
    const handleChange = jest.fn();
    renderFormInput({ handleChange });

    const input = screen.getByRole("textbox");
    userEvent.type(input, "Test");

    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleChange).toHaveBeenCalledWith("name", "T");
    expect(handleChange).toHaveBeenCalledWith("name", "e");
  });

  it("label shrinks when there is value", () => {
    renderFormInput({ value: "Test" });

    const label = screen.getByText("Label");
    expect(label).toHaveClass("shrink");
  });

  it("should * when required", () => {
    renderFormInput({ required: true });

    const required = screen.getByText("*");
    expect(required).toBeInTheDocument();
  });
});
