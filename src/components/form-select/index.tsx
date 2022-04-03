export interface SelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps extends React.HTMLProps<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  options,
  value,
  ...otherProps
}) => (
  <div className="group">
    <select
      name={name}
      id={name}
      value={value}
      {...otherProps}
      className="form-input"
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>

    <label
      htmlFor={name}
      className={`${value ? "shrink" : ""} form-input-label`}
    >
      {label}
    </label>
  </div>
);

export default FormSelect;
