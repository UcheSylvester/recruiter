import "./index.scss";

export interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  name,
  type = "text",
  ...otherProps
}) => (
  <div className="group">
    <input
      className="form-input"
      id={name}
      name={name}
      value={value}
      type={type}
      {...otherProps}
    />
    <label
      className={`${value ? "shrink" : ""} form-input-label`}
      htmlFor={name}
    >
      {label}
    </label>
  </div>
);

export default FormInput;
