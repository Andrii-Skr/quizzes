import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>

        <Link to="/finish">Finish</Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
