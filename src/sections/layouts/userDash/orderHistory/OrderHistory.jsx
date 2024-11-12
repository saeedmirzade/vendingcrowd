import { useState, useCallback, useMemo } from "react";
import AddOrderForm from "../../../../components/addOrderForm/AddOrderForm";
import OrderUnit from "../../../../components/orderUnit/OrderUnit";
import styles from "./orderHistory.module.scss";
import AddVendingForm from "../../../../components/addVendingForm/AddVedingForm";
import { Select } from "antd";
import dayjs from "dayjs";

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
    workDate: dayjs("2024-11-06"),
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(11).minute(0),
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
    workDate: dayjs("2024-11-06"),
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(11).minute(0),
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
    workDate: dayjs("2024-11-06"),
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(11).minute(0),
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
    workDate: dayjs("2024-11-06"),
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(11).minute(0),
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
    workDate: dayjs("2024-11-06"),
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(11).minute(0),
    instructions: "Check for expired items.",
    status: "Done",
  },
];

function OrderHistory() {
  const [openOrder, setOpenOrder] = useState(false);
  const [openVending, setOpenVending] = useState(false);
  const [sort, setSort] = useState("date-asc");
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

  const onChange = useCallback((e) => {
    setSort(e);
  }, []);

  const renderOrderUnits = useMemo(() => {
    return orderList.map((order) => (
      <OrderUnit
        order={order}
        key={order.id}
        setInisial={setInitial}
        setOpenOrder={setOpenOrder}
      />
    ));
  }, []);

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
            <Option value="date-asc">Date (Ascending)</Option>
            <Option value="date-desc">Date (Descending)</Option>
            <Option value="status-open">Status (Open First)</Option>
            <Option value="status-closed">Status (Closed First)</Option>
          </Select>
        </div>
        {renderOrderUnits}
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
