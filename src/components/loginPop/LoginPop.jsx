import { useEffect, useState, useCallback } from "react";
import styles from "./loginPop.module.scss";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const strictEmailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

const LoginPop = ({ show = true, handleOk, handleCancel }) => {
  const [userName, setUserName] = useState("");
  const [code, setCode] = useState("");
  const [codeCheck, setCodeCheck] = useState(false);
  const [emailCode, setEmailCode] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = useCallback((e) => setUserName(e.target.value), []);
  const handleChangeC = useCallback((e) => {
    setCodeCheck(false);
    setCode(e.target.value);
  }, []);

  const handleCancelBtn = useCallback(() => {
    resetForm();
    handleCancel();
  }, [handleCancel, resetForm]);

  const resetForm = useCallback(() => {
    setCode("");
    setUserName("");
    setCodeCheck(false);
    setEmailCode(false);
    setTimer(60);
  }, []);

  const handleOkCode = useCallback(() => {
    if (!emailCode) {
      setEmailCode(true);
      return;
    }
    navigate("/home");
  }, [emailCode, navigate]);

  const handleOkPass = useCallback(() => {
    if (code.length === 6) {
      handleOk();
    } else {
      setCodeCheck(true);
    }
  }, [code, handleOk]);

  const handleResend = useCallback(() => {
    setCode("");
    setTimer(60);
  }, []);

  return (
    <div className={styles.loginPop}>
      {show ? (
        <div className={styles.loginPop__input}>
          <label htmlFor="userName">Email</label>
          <input
            type="email"
            placeholder="please enter your email"
            name="userName"
            id="userName"
            value={userName}
            onChange={handleChange}
            disabled={emailCode}
          />
          {emailCode && (
            <div className={styles.loginPop__input__box}>
              <input
                type="text"
                placeholder="please enter confirmation code (6 digit)"
                name="confirmation"
                id="confirmation"
                value={code}
                onChange={handleChangeC}
              />
              <p>{timer} seconds</p>
              <button disabled={timer !== 0} onClick={handleResend}>
                Resend
              </button>
              {codeCheck && <span>Code is invalid!</span>}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.loginPop__input}>
          <div className={styles.loginPop__input__box}>
            <input
              type="text"
              placeholder="please enter confirmation code (6 digit)"
              name="confirmation"
              id="confirmation"
              value={code}
              onChange={handleChangeC}
            />
            <p>{timer} seconds</p>
            <button disabled={timer !== 0} onClick={handleResend}>
              Resend
            </button>
          </div>
          {codeCheck && <span>Code is invalid!</span>}
        </div>
      )}
      <div className={styles.loginPop__buttons}>
        <button onClick={handleCancelBtn} style={{ backgroundColor: "gray" }}>
          Cancel
        </button>
        {show ? (
          <button
            onClick={handleOkCode}
            disabled={!strictEmailRegex.test(userName)}
          >
            {emailCode ? "Confirm" : "Send code"}
          </button>
        ) : (
          <button onClick={handleOkPass} disabled={code.length !== 6}>
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};
LoginPop.propTypes = {
  show: PropTypes.bool,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default LoginPop;
