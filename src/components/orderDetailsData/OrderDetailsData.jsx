import { Button } from "antd";
import styles from "./orderDetailsData.module.scss";

import { useNavigate } from "react-router-dom";
import { RightCircleFilled } from "@ant-design/icons";
function OrderDetailsData({ item }) {
  const navigate = useNavigate();
  return (
    <div className={styles.orderDetailsData}>
      <div className={styles.orderDetailsData__action}>
        <Button onClick={() => navigate(-1)}>
          Back
          <RightCircleFilled />
        </Button>
      </div>
      <div className={styles.orderDetailsData__data}>
        <ul className={styles.orderDetailsData__data__box}>
          <li>
            <p>Vending Machine Image :</p>
            <img src={item.image} alt="vending macine" />
          </li>
        </ul>
        <ul className={styles.orderDetailsData__data__box}>
          <li>
            <p>Order ID :</p> <span>{item.id}</span>
          </li>
          <li>
            <p>Machine Name :</p> <span>{item.machine}</span>
          </li>
          <li>
            <p>Location :</p> <span>{item.location}</span>
          </li>
        </ul>
        <ul className={styles.orderDetailsData__data__box}>
          <li>
            <p>Task Time :</p> <span>{item.taskTime}</span>
          </li>
          <li>
            <p>Start Time :</p> <span>{item.startTime}</span>
          </li>
          <li>
            <p>End Time :</p> <span>{item.endTime}</span>
          </li>
        </ul>
        <ul className={styles.orderDetailsData__data__box}>
          <li>
            <p>Work Order Type :</p> <span>{item.workOrderType}</span>
          </li>
          {item.products && (
            <li>
              <p>products :</p>
              {item.products.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </li>
          )}
          <li>
            <p>Collect Cash :</p> <span>{item.collectCash}</span>
          </li>
        </ul>
        <ul className={styles.orderDetailsData__data__box}>
          <li>
            <p>instructions :</p> <span>{item.instructions}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrderDetailsData;
