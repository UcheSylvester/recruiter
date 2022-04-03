import "./index.scss";

export interface ButtonProps {
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ children, ...otherProps }) => {
  return (
    <button className="button" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
