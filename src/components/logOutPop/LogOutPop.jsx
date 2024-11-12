import { useNavigate } from "react-router-dom";
import styles from "./logOutPop.module.scss";
import { Modal } from "antd";
import PropTypes from "prop-types";
function LogOutPop({ setLogOut, logOut }) {
  const navigate = useNavigate();
  return (
    <Modal
      title={"Are you sure you want to logout from your account?"}
      open={logOut}
      onCancel={() => setLogOut(false)}
      onOk={() => navigate("/")}
      okText={"I'm Sure"}
    >
      <div className={styles.logOutPop}></div>
    </Modal>
  );
}
LogOutPop.propTypes = {
  setLogOut: PropTypes.func.isRequired,
  logOut: PropTypes.bool.isRequired,
};

export default LogOutPop;
