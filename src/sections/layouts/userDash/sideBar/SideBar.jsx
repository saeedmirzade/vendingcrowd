import { useNavigate } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { RightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
function SideBar({ page }) {
  const navigate = useNavigate();

  const getButtonStyle = (targetPage) => {
    return page === targetPage ? { backgroundColor: "#b79ced7e" } : {};
  };

  return (
    <ul className={styles.sideBar}>
      <li>
        <button onClick={() => navigate("/dashboard")} style={getButtonStyle()}>
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
          <span>Order History</span>
          <RightOutlined />
        </button>
      </li>
    </ul>
  );
}
SideBar.propTypes = {
  page: PropTypes.string,
};

export default SideBar;
