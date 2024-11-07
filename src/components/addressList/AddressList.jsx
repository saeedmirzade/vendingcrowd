import SignleAddress from "../singleAddress/SignleAddress";
import styles from "./addressList.module.scss";
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
  const handlenewAddress = function () {
    setData({
      id: "",
      img: "",
      warehouse: "",
      machineName: "",
      machineColor: "",
      state: "",
      address: "",
      postalCode: "",
      additionalNote: "",
      addressNote: "",
      locationCoordinates: {
        lat: 0,
        lng: 0,
      },
    });
    setVendingOpen(true);
  };
  return (
    <div className={styles.addressList}>
      <h2>Vending Machines List</h2>
      {vendingMachineData.map((item) => {
        return (
          <SignleAddress
            address={item}
            key={item.machineName}
            setData={setData}
            setVendingOpen={setVendingOpen}
          />
        );
      })}
      <button className={styles.addressList__add} onClick={handlenewAddress}>
        +
      </button>
    </div>
  );
}

export default AddressList;
