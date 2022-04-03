import { capitalize } from "../../../helpers";
import useOnboardingForm, { Country } from "../../../hooks/use-onboarding-form";
import Button from "../../button";
import FormInput from "../../form-input";
import "./index.scss";

export const countries: Country[] = ["ghana", "spain", "brazil"];

const OnboardingForm = () => {
  const { formValues, formErrors, handleChange, handleSubmit, handleBlur } =
    useOnboardingForm();

  const {
    first_name,
    last_name,
    date_of_birth,
    country_of_work,
    holiday_allowance,
    marital_status,
    working_hours,
    social_insurance_number,
    number_of_children,
  } = formValues;

  const {
    first_name: first_name_error,
    last_name: last_name_error,
    date_of_birth: date_of_birth_error,
    country_of_work: country_of_work_error,
    holiday_allowance: holiday_allowance_error,
    marital_status: marital_status_error,
    working_hours: working_hours_error,
    social_insurance_number: social_insurance_number_error,
    number_of_children: number_of_children_error,
  } = formErrors;

  const getMaritalStatusOrWorkingHourProps = (country: string) => {
    const maritalStatusProps = {
      name: "marital_status",
      label: "Marital Status",
      type: "select",
      value: marital_status,
      error: marital_status_error,
      options: [
        {
          label: "Single",
          value: "single",
        },
        {
          label: "Married",
          value: "married",
        },
      ],
    };

    const workingHourProps = {
      name: "working_hours",
      label: "Working Hours",
      error: working_hours_error,
      value: working_hours,
      type: "number",
    };

    if (country === "ghana") {
      return workingHourProps;
    }

    return maritalStatusProps;
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <FormInput
        label="First Name"
        name="first_name"
        value={first_name}
        error={first_name_error}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormInput
        label="Last Name"
        name="last_name"
        error={last_name_error}
        value={last_name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormInput
        label="Date of Birth"
        type="date"
        name="date_of_birth"
        error={date_of_birth_error}
        value={date_of_birth}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormInput
        type="select"
        value={country_of_work}
        label="Country of work"
        name="country_of_work"
        error={country_of_work_error}
        onChange={handleChange}
        options={countries.map((country) => ({
          label: capitalize(country),
          value: country,
        }))}
        onBlur={handleBlur}
      />

      <FormInput
        label="Holiday Allowance"
        name="holiday_allowance"
        type="number"
        error={holiday_allowance_error}
        onBlur={handleBlur}
        value={holiday_allowance}
        onChange={handleChange}
      />

      {country_of_work && (
        <FormInput
          onChange={handleChange}
          onBlur={handleBlur}
          {...getMaritalStatusOrWorkingHourProps(country_of_work)}
        />
      )}

      {country_of_work === "spain" && (
        <FormInput
          label="Social Insurance Number"
          name="social_insurance_number"
          error={social_insurance_number_error}
          onBlur={handleBlur}
          value={social_insurance_number}
          onChange={handleChange}
        />
      )}

      {country_of_work === "ghana" && (
        <FormInput
          label="Number of Children"
          name="number_of_children"
          type="number"
          error={number_of_children_error}
          onBlur={handleBlur}
          value={number_of_children}
          onChange={handleChange}
        />
      )}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default OnboardingForm;
