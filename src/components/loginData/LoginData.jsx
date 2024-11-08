import styles from "./loginData.module.scss";
import { memo } from "react";

const LoginData = memo(function LoginData() {
  return (
    <div className={styles.loginData}>
      <h1>We can help you grow your business</h1>
      <img src="/images/background/login.png" alt="loginbg" />
    </div>
  );
});

export default LoginData;
