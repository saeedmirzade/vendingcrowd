import { lazy, Suspense } from "react";

import DetailsForm from "../../../../components/detailsForm/DetailsForm";
import styles from "./details.module.scss";
import Loader from "../../../../components/Loader";

const AddressList = lazy(() =>
  import("../../../../components/addressList/AddressList")
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
  return (
    <div className={styles.details}>
      <DetailsForm states={states} />
      <Suspense fallback={<Loader />}>
        <AddressList />
      </Suspense>
    </div>
  );
}

export default Details;
