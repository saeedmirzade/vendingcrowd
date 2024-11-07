import { useNavigate } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { RightOutlined } from "@ant-design/icons";
function SideBar({ page }) {
  const navigate = useNavigate();
  return (
    <ul className={styles.sideBar}>
      <li>
        <button
          onClick={() => navigate("/Dashboard")}
          style={{
            backgroundColor: `${!page ? "#b79ced7e" : ""}`,
          }}
        >
          <span>Inventory</span>
          <RightOutlined />
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/Dashboard/Data")}
          style={{
            backgroundColor: `${page === "Data" ? "#b79ced7e" : ""}`,
          }}
        >
          <span>Personal data</span>
          <RightOutlined />
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/Dashboard/History")}
          style={{
            backgroundColor: `${page === "History" ? "#b79ced7e" : ""}`,
          }}
        >
          <span>Order History</span>
          <RightOutlined />
        </button>
      </li>
    </ul>
  );
}

export default SideBar;
