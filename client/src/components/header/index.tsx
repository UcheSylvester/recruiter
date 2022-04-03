import VisibilityHidden from "../visibility-hidden";
import "./index.scss";

export interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => (
  <header className="header">
    <h1 className="heading__primary">Recruiter</h1>
    <VisibilityHidden>{pageTitle}</VisibilityHidden>
  </header>
);

export default Header;
