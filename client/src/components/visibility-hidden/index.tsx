import "./index.scss";

// For adding invisible contents. Need for screen readers and a11y
const VisibilityHidden: React.FC = ({ children }) => (
  <p className="visibility-hidden">{children}</p>
);

export default VisibilityHidden;
