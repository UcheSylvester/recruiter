import Footer from "../footer";
import Header, { HeaderProps } from "../header";

export interface LayoutProps extends HeaderProps {}

const Layout: React.FC<LayoutProps> = ({ children, ...otherProps }) => (
  <>
    <Header {...otherProps} />

    <main>{children}</main>

    <Footer />
  </>
);

export default Layout;
