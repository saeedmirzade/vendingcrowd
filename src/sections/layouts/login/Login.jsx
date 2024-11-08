import { useState, useCallback } from "react";
import LoginFrom from "../../../components/loginFrom/LoginFrom";
import styles from "./login.module.scss";
import { Modal } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import LoginPop from "../../../components/loginPop/LoginPop";
import { useNavigate } from "react-router-dom";
import LoginData from "../../../components/loginData/LoginData";

function Login() {
  const [signIn, setSignIn] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const responseGoogle = useCallback((response) => {}, []);
  const responseFacebook = useCallback((response) => {}, []);

  const handleOk = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.login__data}>
        <LoginData />
      </div>
      <div className={styles.login__form}>
        <LoginFrom sign={signIn} setIsModalVisible={setIsModalVisible} />
        <div className={styles.login__form__text}>
          {signIn ? (
            <p>haven&apos;t signed up yet?</p>
          ) : (
            <p>already have an account?</p>
          )}
          <button onClick={() => setSignIn((prev) => !prev)}>
            {signIn ? "Sign Up" : "Sign In"}
          </button>
        </div>
        {signIn && (
          <>
            <p>Or</p>
            <div className={styles.login__form__ezlogin}>
              <div className={styles.login__form__ezlogin__google__button}>
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={(error) => {
                    console.error("Google Login Error: ", error);
                    setIsModalVisible(true);
                  }}
                />
              </div>
              <div className={styles.login__form__ezlogin__facebook__button}>
                <FacebookLogin
                  appId="YOUR_APP_ID"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        title={`${signIn ? "Password recovery" : "Confirm your email"}`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginPop
          show={signIn}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}

export default Login;
