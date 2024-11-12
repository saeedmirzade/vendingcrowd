import { useParams } from "react-router-dom";
import styles from "./orderDetail.module.scss";
import Navigation from "../../../components/navigation/Navigation";
import Footer from "../../../components/footer/Footer";
import OrderTopic from "../../../components/orderTopic/OrderTopic";
import OrderDetailsData from "../../../components/orderDetailsData/ORderDetailsData";
import { useMemo } from "react";

const order = {
  id: 12345,
  location: "California",
  machine: "Snack Machine 1",
  image: "/images/address/vending.jpg",
  workOrderType: "Restock",
  products: ["Soda", "Chips"],
  collectCash: "Yes",
  taskTime: "2 hours",
  workDate: new Date("2024-11-06T00:00:00Z"),
  startTime: "09:00",
  endTime: "11:00",
  instructions: "Check for expired items.",
  status: "Done",
  finishedImg: "/images/address/vending.jpg",
  price: "$35",
};

function OrderDetail() {
  const { id } = useParams();
  const orderData = useMemo(() => order, []);

  return (
    <>
      <Navigation />
      <div className={styles.orderDetail}>
        <OrderTopic item={order} />
        <OrderDetailsData item={order} />
      </div>
      <Footer />
    </>
  );
}

export default OrderDetail;
