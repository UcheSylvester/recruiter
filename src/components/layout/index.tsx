import Footer from "../footer";
import Header, { HeaderProps } from "../header";

import "./index.scss";

export interface LayoutProps extends HeaderProps {}

const Layout: React.FC<LayoutProps> = ({ children, ...otherProps }) => (
  <>
    <Header {...otherProps} />

    <main id="main-content">{children}</main>

    <Footer />
  </>
);

export default Layout;
