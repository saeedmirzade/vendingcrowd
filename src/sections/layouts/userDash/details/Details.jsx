import { useState, lazy, Suspense, useCallback } from "react";
import AddressList from "../../../../components/addressList/AddressList";
import DetailsForm from "../../../../components/detailsForm/DetailsForm";
import styles from "./details.module.scss";
import Loader from "../../../../components/Loader";

const AddVendingForm = lazy(() =>
  import("../../../../components/addVendingForm/AddVedingForm")
);

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function Details() {
  const [addMachine, setAddMachine] = useState(false);
  const [data, setData] = useState("");
  return (
    <div className={styles.details}>
      <DetailsForm states={states} />
      <Suspense fallback={<Loader />}>
        <AddressList setVendingOpen={setAddMachine} setData={setData} />
        <AddVendingForm
          vendingOpen={addMachine}
          setVendingOpen={setAddMachine}
          id={data}
        />
      </Suspense>
    </div>
  );
}

export default Details;
