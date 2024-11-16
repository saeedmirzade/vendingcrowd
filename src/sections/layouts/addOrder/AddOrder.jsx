import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./addOrder.module.scss";
import AddOrderForm from "../../../components/addOrderForm/AddOrderForm";
import Footer from "../../../components/footer/Footer";

function AddOrder() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={styles.addOrder}>
        <h2>{id ? "Duplicate Order" : "Add New Order"}</h2>
        <AddOrderForm id={id} />
      </div>
      <Footer />
    </>
  );
}

export default AddOrder;
