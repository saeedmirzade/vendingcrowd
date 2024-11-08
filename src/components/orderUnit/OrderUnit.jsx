import { useNavigate } from "react-router-dom";
import styles from "./orderUnit.module.scss";
function OrderUnit({ order, setInisial, setOpenOrder }) {
  const navigate = useNavigate();
  const handleDuplicate = function (e) {
    e.stopPropagation();
    setInisial(order);
    setOpenOrder(true);
  };

  return (
    <div className={styles.orderUnit}>
      <div className={styles.orderUnit__image}>
        <img src={order.image} alt="vending machine" />
      </div>
      <div className={styles.orderUnit__text}>
        <p>
          Order ID : <span>{order.id}</span>
        </p>
        <p>
          Machine Name : <span>{order.machine}</span>
        </p>

        <p>
          Date : <span>{new Date(order.workDate).toLocaleString()}</span>
        </p>
        <p>
          Status :
          <span
            style={{
              borderBottom: `2px solid ${
                order.status === "Done" ? "green" : "red"
              }`,
            }}
          >
            {order.status}
          </span>
        </p>
        <p>
          Work type : <span>{order.workOrderType}</span>
        </p>
      </div>
      <div className={styles.orderUnit__action}>
        <button
          onClick={handleDuplicate}
          className={styles.orderUnit__action__down}
        >
          Duplicate Order
        </button>
        <button onClick={() => navigate(`/order-details/${order.id}`)}>
          Check Details
        </button>
      </div>
    </div>
  );
}

export default OrderUnit;
