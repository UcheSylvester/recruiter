import { useState } from "react";
import { capitalize } from "../../../helpers";
import FormInput from "../../form-input";
import FormSelect from "../../form-select";
import "./index.scss";

const countries = ["spain", "ghana", "brazil"];

export interface FormValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryOfWork: string;
}

const OnboardingForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    countryOfWork: "",
  });

  const { firstName, lastName, dateOfBirth, countryOfWork } = formValues;

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form className="employee-form">
      <FormInput
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={handleChange}
      />
      <FormInput
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={handleChange}
      />
      <FormInput
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={dateOfBirth}
        onChange={handleChange}
      />
      <FormSelect
        value={countryOfWork}
        label="Country of work"
        name="countryOfWork"
        onChange={handleChange}
        options={countries.map((country) => ({
          label: capitalize(country),
          value: country,
        }))}
      />
    </form>
  );
};

export default OnboardingForm;
