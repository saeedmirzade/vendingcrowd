import { useParams } from "react-router-dom";
import AddVendingForm from "../../../components/addVendingForm/AddVedingForm";
import Footer from "../../../components/footer/Footer";
import styles from "./addVending.module.scss";
import { useEffect } from "react";
function AddVending() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={styles.addVending}>
        <h2>{id ? "Edit Address" : "Add New Address"}</h2>
        <AddVendingForm id={id} />
      </div>
      <Footer />
    </>
  );
}

export default AddVending;
