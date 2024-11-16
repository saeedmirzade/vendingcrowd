import { useNavigate } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { RightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { useState } from "react";
function SideBar({ page }) {
  const navigate = useNavigate();
  const [log, setLog] = useState();
  const getButtonStyle = (targetPage) => {
    return page === targetPage ? { backgroundColor: "#b79ced7e" } : {};
  };
  const toggleLog = function () {
    setLog(!log);
  };
  return (
    <>
      <ul className={styles.sideBar}>
        <li>
          <button
            onClick={() => navigate("/dashboard")}
            style={getButtonStyle()}
          >
            <span>Inventory</span>
            <RightOutlined />
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/dashboard/data")}
            style={getButtonStyle("data")}
          >
            <span>Personal data</span>
            <RightOutlined />
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/dashboard/history")}
            style={getButtonStyle("history")}
          >
            <span>Orders</span>
            <RightOutlined />
          </button>
        </li>
        <li className={styles.sideBar__logOut}>
          <button onClick={toggleLog}>Log out</button>
        </li>
      </ul>
      <Modal
        open={log}
        onCancel={toggleLog}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        footer={false}
      >
        <div className={styles.sideBar__modal}>
          <h3 className={styles.sideBar__modal__head}>
            Are you sure you want to log out?
          </h3>
          <div className={styles.sideBar__modal__action}>
            <button onClick={toggleLog}>Cancel</button>
            <button onClick={() => navigate("/")} style={{ color: "red" }}>
              Log out
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
SideBar.propTypes = {
  page: PropTypes.string,
};

export default SideBar;
