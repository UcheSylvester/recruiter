import "./index.scss";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormInputProps extends React.HTMLProps<any> {
  label: string;
  options?: SelectOption[];
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  name,
  type = "text",
  options,
  required = true,
  error,
  ...otherProps
}) => {
  const cls = `form-input ${error ? "form-input--error" : ""}`;

  return (
    <div className="input-group">
      {type === "select" ? (
        <select
          name={name}
          id={name}
          value={value}
          required={required}
          {...otherProps}
          className={cls}
        >
          <option value="">Select an Option</option>
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={cls}
          id={name}
          name={name}
          value={value}
          type={type}
          required={required}
          {...otherProps}
        />
      )}

      <label
        className={`${value ? "shrink" : ""} form-input-label`}
        htmlFor={name}
      >
        {label} {required && <span className="required">*</span>}
      </label>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FormInput;
