import styles from "./orderTopic.module.scss";
function OrderTopic({ item }) {
  return (
    <div className={styles.orderTopic}>
      <ul>
        <li>
          <p>Status :</p>
          <span>{item.status}</span>
        </li>
        <li>
          <p>Price :</p>
          <span>{item.price}</span>
        </li>
        <li>
          <p>Work Date :</p>
          <span>{item.workDate.toLocaleDateString()}</span>
        </li>
        {item.status === "Done" && (
          <li>
            <p>Proof :</p>
            <img src={item.finishedImg} alt="Proof" />
          </li>
        )}
      </ul>
    </div>
  );
}

export default OrderTopic;
