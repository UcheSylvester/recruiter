import { useState } from "react";
import { toast } from "react-toastify";
import { capitalize } from "../helpers";
import useData from "./use-data";

export type Country = "spain" | "ghana" | "brazil" | "";

export interface FormValues {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  country_of_work: Country;
  holiday_allowance: string;
  marital_status: string;
  working_hours: string;
  social_insurance_number: string;
  number_of_children: string;
}

const useOnboardingForm = () => {
  const defaultValues: FormValues = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    country_of_work: "",
    holiday_allowance: "",
    marital_status: "",
    working_hours: "",
    social_insurance_number: "",
    number_of_children: "",
  };
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [formErrors, setFormErrors] = useState<FormValues>(defaultValues);

  const { makeRequest } = useData({ url: "/employees" });

  const onSetFormValue = (key: keyof FormValues, value: string) =>
    setFormValues({ ...formValues, [key]: value });

  const handleChange = (name: string, value: string) => {
    onSetFormValue(name as keyof FormValues, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // we can only get here when all required fields are filled
    // so it is safe to remove inputs that have no value
    const filteredFormValues = Object.entries(formValues).filter(
      ([, value]) => value !== ""
    );

    // validate all filteredFields
    let isValid = true;
    filteredFormValues.forEach(([key, value]) => {
      const error = validate(key as keyof FormValues, value);
      if (error) {
        isValid = false;
        setFormErrors({ ...formErrors, [key]: error });
      }
    });

    if (!isValid) return;

    const formData = filteredFormValues.reduce((acc, [key, value]) => {
      return { ...acc, [key]: value };
    }, {});

    submitForm(formData);
  };

  const submitForm = async (formData: Record<string, string>) => {
    try {
      const data = await makeRequest({ data: formData, method: "post" });
      console.log({ data });
      resetForm();
      toast("Successfully created employee", { type: "success" });
    } catch (error) {
      console.log({ error });
      toast("Error creating employee", { type: "error" });
    }
  };

  const resetForm = () => {
    setFormValues(defaultValues);
    setFormErrors(defaultValues);
  };

  const getHolidayAllowanceError = (value: number, country: Country) => {
    let error = "";

    switch (country) {
      case "spain":
        error = value < 30 ? "Holiday allowance must be at least 30 days" : "";
        break;

      case "brazil":
        error = value > 40 ? "Holiday allowance must be less than 40 days" : "";
        break;

      default:
        error = "";
    }

    return error;
  };

  const validate = (name: keyof FormValues, value: string) => {
    const label = capitalize(name.split("_").join(" "));
    let error = "";

    // all fields are required
    if (!value) {
      error = `${label} is required`;
    } else {
      error = "";
    }

    if (name === "holiday_allowance") {
      const holidayError = getHolidayAllowanceError(
        Number(value),
        formValues.country_of_work
      );
      if (holidayError) {
        error = holidayError;
      }
    }

    return error;
  };

  const onSetFormError = (key: keyof FormValues, value: string) =>
    setFormErrors({ ...formErrors, [key]: value });

  const validateAndSetError = (name: keyof FormValues, value: string) => {
    const error = validate(name, value);
    onSetFormError(name, error);
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    handleBlur: ({ target: { name, value } }: React.FocusEvent<any>) =>
      validateAndSetError(name, value),
  };
};

export default useOnboardingForm;
