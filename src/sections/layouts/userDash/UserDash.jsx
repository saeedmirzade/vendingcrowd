import { useParams } from "react-router-dom";
import styles from "./userDash.module.scss";
import SideBar from "./sideBar/SideBar";
import Footer from "../../../components/footer/Footer";
import { lazy, Suspense, useMemo } from "react";
import Loader from "../../../components/Loader";
import ScrollToTop from "../../../components/scrollToTop/ScrollToTop";

function UserDash() {
  const { page } = useParams();

  const Info = useMemo(() => lazy(() => import("./info/Info")), []);
  const OrderHistory = useMemo(
    () => lazy(() => import("./orderHistory/OrderHistory")),
    []
  );
  const Details = useMemo(() => lazy(() => import("./details/Details")), []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className={styles.userDash}>
          <SideBar page={page} />
          {!page && <Info />}
          {page === "history" && <OrderHistory />}
          {page === "data" && <Details />}
        </div>
      </Suspense>
      <Footer />
    </>
  );
}

export default UserDash;
