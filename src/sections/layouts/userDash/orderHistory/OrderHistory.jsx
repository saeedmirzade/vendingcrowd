import { useState } from "react";
import AddOrderForm from "../../../../components/addOrderForm/AddOrderForm";
import OrderUnit from "../../../../components/orderUnit/OrderUnit";
import styles from "./orderHistory.module.scss";
import AddVendingForm from "../../../../components/addVendingForm/AddVedingForm";
import { Select } from "antd";

const { Option } = Select;
const orderList = [
  {
    id: 1234,
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
    status: "Progressing",
  },
  {
    id: 12342,
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
  },
  {
    id: 12343,
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
  },
  {
    id: 12344,
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
  },
  {
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
  },
];

function OrderHistory() {
  const [openOrder, setOpenOrder] = useState(false);
  const [openVending, setOpenVending] = useState(false);
  const [sort, setSort] = useState("dateAsc");
  const [initial, setInitial] = useState({
    id: "",
    location: "",
    machine: "",
    image: "",
    workOrderType: "",
    products: [],
    collectCash: "",
    taskTime: "",
    workDate: "",
    startTime: "",
    endTime: "",
    instructions: "",
    status: "",
  });
  const onChange = function (e) {
    setSort(e);
  };
  return (
    <>
      <div className={styles.orderHistory}>
        <div className={styles.orderHistory__head}>
          <h2>Order History</h2>
          <Select
            placeholder="Sort by"
            style={{ width: 200 }}
            onChange={onChange}
            value={sort}
          >
            <Option value="dateAsc">Date (Ascending)</Option>
            <Option value="dateDesc">Date (Descending)</Option>

            <Option value="statusOpen">Status (Open First)</Option>
            <Option value="statusClosed">Status (Closed First)</Option>
          </Select>
        </div>
        {orderList.map((order) => {
          return (
            <OrderUnit
              order={order}
              key={order.id}
              setInisial={setInitial}
              setOpenOrder={setOpenOrder}
            />
          );
        })}
      </div>
      <AddOrderForm
        orderPop={openOrder}
        setOrderPop={setOpenOrder}
        setAddVending={setOpenVending}
        initial={initial}
        setInitial={setInitial}
      />
      <AddVendingForm
        vendingOpen={openVending}
        setVendingOpen={setOpenVending}
        inisial={{
          warehouse: "",
          address: "",
          machineName: "",
          machineColor: "",
          state: null,
          postalCode: "",
          additionalNote: "",
          addressNote: "",
          id: "",
          img: "",
        }}
      />
    </>
  );
}

export default OrderHistory;