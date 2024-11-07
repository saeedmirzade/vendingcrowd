import { useState } from "react";
import DesktopNav from "./dekstopNav/DesktopNav";
import MobileNav from "./mobileNav/MobileNav";

function Navigation() {
  const isMobile = window.innerWidth > 700;

  return <>{isMobile ? <DesktopNav /> : <MobileNav />}</>;
}

export default Navigation;
