import { Outlet } from "react-router";
import classes from "./index.module.scss";

const NavbarLayout = () => {
  return (
    <>
      <div className={classes.navbarLayout}>Pitstop</div>
      <Outlet />
    </>
  );
};

export default NavbarLayout;
