import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.scss";
import { useEffect, useState, useCallback } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PropTypes from "prop-types";
const strictEmailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
const strictPasswordRegex = /^(?=.*\d)[A-Za-z\d]{6,}$/;

const LoginFrom = ({ sign, setIsModalVisible }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    passwordR: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    password: false,
    passwordR: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({
      userName: "",
      password: "",
      passwordR: "",
    });
    setValidationErrors({ name: false, password: false, passwordR: false });
    setShowPassword(false);
  }, [sign]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: false }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { userName, password, passwordR } = formData;

      const isNameInvalid = !userName || !strictEmailRegex.test(userName);
      const isPassInvalid = !password || !strictPasswordRegex.test(password);
      const isConfirmPassInvalid = sign ? false : password !== passwordR;

      setValidationErrors({
        name: isNameInvalid,
        password: isPassInvalid,
        passwordR: isConfirmPassInvalid,
      });

      if (
        isNameInvalid ||
        isPassInvalid ||
        (sign === false && isConfirmPassInvalid)
      )
        return;

      if (sign) {
        navigate("/home");
      } else {
        setIsModalVisible(true);
      }
    },
    [formData, sign, navigate, setIsModalVisible]
  );

  return (
    <form className={styles.loginFrom} onSubmit={handleSubmit}>
      <h2>{sign ? "Sign in to your account" : "Create new account"}</h2>
      <div className={styles.loginFrom__box}>
        <label htmlFor="userName">Email</label>
        <input
          type="email"
          placeholder="please enter your email"
          name="userName"
          id="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        {validationErrors.name && (
          <span className={styles.loginFrom__box__explain}>
            Please enter your email correctly
          </span>
        )}
      </div>
      <div className={styles.loginFrom__box}>
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="********"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </button>
        {sign && (
          <button
            type="button"
            className={styles.loginFrom__box__forgetPass}
            onClick={() => setIsModalVisible(true)}
          >
            Forgot your password?
          </button>
        )}
        {validationErrors.password && (
          <span className={styles.loginFrom__box__explain}>
            Password must be at least 6 characters and include at least 1
            number.
          </span>
        )}
      </div>
      {!sign && (
        <div className={styles.loginFrom__box}>
          <label htmlFor="passwordR">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            name="passwordR"
            id="passwordR"
            value={formData.passwordR}
            onChange={handleChange}
          />
          {validationErrors.passwordR && (
            <span className={styles.loginFrom__box__explain}>
              Passwords do not match.
            </span>
          )}
        </div>
      )}
      <Button
        className={styles.loginFrom__submit}
        type="primary"
        htmlType="submit"
      >
        {sign ? "Login" : "Continue"}
      </Button>
    </form>
  );
};
LoginFrom.propTypes = {
  sign: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
};
export default LoginFrom;
