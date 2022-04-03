import OnboardingForm from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderOnboardingForm = () => {
  render(<OnboardingForm />);
};

describe("<OnboardingForm />", () => {
  it("always render 'first name', 'last name', 'date of birth', 'country of work', 'holiday allowance'", () => {
    renderOnboardingForm();

    const firstNameInput = screen.getByTestId("first_name");
    const lastNameInput = screen.getByTestId("last_name");
    const dateOfBirthInput = screen.getByTestId("date_of_birth");
    const countryOfWorkInput = screen.getByTestId("country_of_work");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(dateOfBirthInput).toBeInTheDocument();
    expect(countryOfWorkInput).toBeInTheDocument();
  });

  it("when country of work is ghana show 'marital status' and 'number of children'", () => {
    renderOnboardingForm();

    const countryInput = screen.getByTestId("country_of_work");

    userEvent.selectOptions(countryInput, "ghana");

    const workingHoursInput = screen.getByTestId("marital_status");
    const numberOfChildrenInput = screen.getByTestId("number_of_children");

    expect(workingHoursInput).toBeInTheDocument();
    expect(numberOfChildrenInput).toBeInTheDocument();
  });

  it("when country of work is spain show 'marital status' and 'social insurance number'. Also validate holiday allowance", () => {
    renderOnboardingForm();

    const countryInput = screen.getByTestId("country_of_work");

    userEvent.selectOptions(countryInput, "spain");

    const workingHoursInput = screen.getByTestId("marital_status");
    const numberOfChildrenInput = screen.getByTestId("social_insurance_number");

    expect(workingHoursInput).toBeInTheDocument();
    expect(numberOfChildrenInput).toBeInTheDocument();

    // Validate holiday allowance
    const holidayAllowanceInput = screen.getByTestId("holiday_allowance");

    // test for when it less than 30
    userEvent.type(holidayAllowanceInput, "23");
    fireEvent.blur(holidayAllowanceInput);

    const errorMessage = screen.getByText(
      "Holiday allowance must be at least 30 days"
    );
    expect(errorMessage).toBeInTheDocument();

    // test for when it more than 30
    userEvent.clear(holidayAllowanceInput);
    userEvent.type(holidayAllowanceInput, "31");
    fireEvent.blur(holidayAllowanceInput);

    expect(errorMessage).not.toBeInTheDocument();
  });

  it("when country of work is brazil show 'working hours' and 'number of children'. Also validate holiday allowance", () => {
    renderOnboardingForm();

    const countryInput = screen.getByTestId("country_of_work");

    userEvent.selectOptions(countryInput, "brazil");

    const workingHoursInput = screen.getByTestId("working_hours");
    expect(workingHoursInput).toBeInTheDocument();

    const holidayAllowanceInput = screen.getByTestId("holiday_allowance");
    expect(holidayAllowanceInput).toBeInTheDocument();

    // test for when holiday allowance is greater than 40
    userEvent.type(holidayAllowanceInput, "41");
    fireEvent.blur(holidayAllowanceInput);

    const holidayAllowanceError = screen.getByText(
      "Holiday allowance must be less than 40 days"
    );
    expect(holidayAllowanceError).toBeInTheDocument();

    // test for when holiday allowance is less than 40
    userEvent.clear(holidayAllowanceInput);
    userEvent.type(holidayAllowanceInput, "39");
    fireEvent.blur(holidayAllowanceInput);

    expect(holidayAllowanceError).not.toBeInTheDocument();
  });
});
