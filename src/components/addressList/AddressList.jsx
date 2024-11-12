import { useCallback } from "react";
import SignleAddress from "../singleAddress/SignleAddress";
import styles from "./addressList.module.scss";
import PropTypes from "prop-types";
const vendingMachineData = [
  {
    id: "1234",
    img: "/images/address/vending.jpg",
    warehouse: "Warehouse1",
    machineName: "Healthy Snacks Machine",
    machineColor: "Green",
    state: "California",
    address: "456 Wellness Blvd",
    postalCode: "90210",
    additionalNote: "Restock weekly with organic snacks.",
    addressNote: "Located near the main entrance.",
    locationCoordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
];

function AddressList({ setData, setVendingOpen }) {
  const handlenewAddress = useCallback(() => {
    setData("");
    setVendingOpen(true);
  }, [setData, setVendingOpen]);

  return (
    <div className={styles.addressList}>
      <h2>Vending Machines List</h2>
      {vendingMachineData.map((item) => (
        <SignleAddress
          address={item}
          key={item.id}
          setData={setData}
          setVendingOpen={setVendingOpen}
        />
      ))}
      <button className={styles.addressList__add} onClick={handlenewAddress}>
        +
      </button>
    </div>
  );
}
AddressList.propTypes = {
  setData: PropTypes.func,
  setVendingOpen: PropTypes.func,
};
export default AddressList;
