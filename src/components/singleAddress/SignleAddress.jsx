import { DeleteFilled, EditFilled } from "@ant-design/icons";
import styles from "./singleAddress.module.scss";
import { Button, Modal } from "antd";
import { useState, useCallback } from "react";

function SingleAddress({ address, setData, setVendingOpen }) {
  const [deleter, setDeleter] = useState(false);

  const handleDelete = useCallback(() => {
    setDeleter(true);
  }, []);

  const handleEdit = useCallback(() => {
    setData(address);
    setVendingOpen(true);
  }, [address, setData, setVendingOpen]);

  return (
    <div className={styles.singleAddress}>
      <div className={styles.singleAddress__image}>
        <img src={address.img} alt={address.machineName} />
      </div>
      <div className={styles.singleAddress__data}>
        <h3>{address.machineName}</h3>
        <p>
          <strong>{address.state}- </strong>
          <span>{address.address}- </span>
          <span>Postal code : {address.postalCode}</span>
        </p>
        <p>{address.warehouse}</p>
      </div>
      <div className={styles.singleAddress__actions}>
        <Button
          icon={<EditFilled />}
          className={styles.singleAddress__actions__edit}
          onClick={handleEdit}
        />
        <Button
          icon={<DeleteFilled />}
          className={styles.singleAddress__actions__delete}
          onClick={handleDelete}
        />
        <Modal
          okText="Delete"
          onCancel={() => setDeleter(false)}
          onOk={() => setDeleter(false)}
          open={deleter}
        >
          <h3>Are you sure you want to delete this address?</h3>
        </Modal>
      </div>
    </div>
  );
}

export default SingleAddress;
