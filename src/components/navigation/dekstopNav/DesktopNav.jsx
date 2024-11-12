import { NavLink } from "react-router-dom";
import styles from "./desktopNav.module.scss";
import { useState } from "react";
import LogOutPop from "../../logOutPop/LogOutPop";
function DesktopNav() {
  const [logOut, setLogOut] = useState(false);
  return (
    <div className={styles.desktopNav}>
      <NavLink to={"/home"} className={styles.desktopNav__logo}>
        <img src="/images/logo/logo@2x.png" alt="logo" />
      </NavLink>

      <ul className={styles.desktopNav__tabs}>
        <li>
          <NavLink to={"/home"}>
            <span> Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard"}>
            <span>Dashboard</span>
          </NavLink>
        </li>
      </ul>

      <button
        className={styles.desktopNav__action}
        onClick={() => setLogOut(true)}
      >
        LogOut
      </button>
      <LogOutPop setLogOut={setLogOut} logOut={logOut} />
    </div>
  );
}

export default DesktopNav;
