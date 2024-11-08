import { useState, useCallback } from "react";

import styles from "./info.module.scss";
import { Table } from "antd";
import AddItem from "../../../../components/addItem/AddItem";

const inventoryList = [
  {
    key: "1",
    item: "Coca Cola",
    image: "/images/items/cocacola.jpg",
    warehouse1: "100",
    warehouse2: "0",
    warehouse3: "75",
  },
  {
    key: "2",
    item: "Pepsi",
    image: "/images/items/pepsi.jpg",
    warehouse1: "0",
    warehouse2: "60",
    warehouse3: "90",
  },
  {
    key: "3",
    item: "Sprite",
    image: "/images/items/sprite.jpg",
    warehouse1: "120",
    warehouse2: "40",
    warehouse3: "0",
  },
  {
    key: "4",
    item: "Fanta",
    image: "/images/items/fanta.jpg",
    warehouse1: "70",
    warehouse2: "100",
    warehouse3: "50",
  },
  {
    key: "5",
    item: "Dr Pepper",
    image: "/images/items/drpepper.jpg",
    warehouse1: "90",
    warehouse2: "20",
    warehouse3: "60",
  },
];

const columns = [
  {
    title: "Item",
    key: "item",
    render: (text, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={record.image}
          alt={record.item}
          style={{
            marginRight: 8,
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
        <span>{record.item}</span>
      </div>
    ),
  },
  {
    title: "Warehouse 1",
    dataIndex: "warehouse1",
    key: "warehouse1",
  },
  {
    title: "Warehouse 2",
    dataIndex: "warehouse2",
    key: "warehouse2",
  },
  {
    title: "Warehouse 3",
    dataIndex: "warehouse3",
    key: "warehouse3",
  },
];

function Info() {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className={styles.info}>
      <div className={styles.info__head}>
        <h2>Your inventory</h2>
        <button onClick={handleOpen}>Add item +</button>
      </div>
      <Table
        dataSource={inventoryList}
        columns={columns}
        pagination={{ pageSize: 8 }}
        rowKey="key"
      />
      <AddItem open={open} setOpen={setOpen} />
    </div>
  );
}

export default Info;
