import { DeleteFilled, EditFilled } from "@ant-design/icons";
import styles from "./singleAddress.module.scss";
import { Button, Modal } from "antd";
import { useState } from "react";
function SignleAddress({ address, setData, setVendingOpen }) {
  const handleDelete = function () {
    setDeleter(true);
  };
  const handleEdit = function () {
    setData(address);
    setVendingOpen(true);
  };
  const [deleter, setDeleter] = useState(false);
  return (
    <div className={styles.signleAddress}>
      <div className={styles.signleAddress__image}>
        <img src={address.img} alt={address.machineName} />
      </div>
      <div className={styles.signleAddress__data}>
        <h3>{address.machineName}</h3>
        <p>
          <strong>{address.state}- </strong> <span>{address.address}- </span>
          <span>Postcal code : {address.postalCode}</span>
        </p>
        <p>{address.warehouse}</p>
      </div>
      <div className={styles.signleAddress__actions}>
        <Button
          icon={<EditFilled />}
          className={styles.signleAddress__actions__edit}
          onClick={handleEdit}
        ></Button>
        <Button
          icon={<DeleteFilled />}
          className={styles.signleAddress__actions__delete}
          onClick={handleDelete}
        ></Button>
        <Modal
          okText={"Delete"}
          onCancel={() => setDeleter(false)}
          onOk={() => setDeleter(false)}
          open={deleter}
        >
          <h3>Are you sure you want to Delete this address?</h3>
        </Modal>
      </div>
    </div>
  );
}

export default SignleAddress;
