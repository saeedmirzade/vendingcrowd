import React, { useEffect, useState } from "react";
import styles from "./scrollToTop.module.scss";
import { ArrowUpOutlined } from "@ant-design/icons";

const useDebounce = (callback, delay) => {
  const debounceRef = React.useRef(null);

  const debouncedCallback = (...args) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const debouncedHandleScroll = useDebounce(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return (
    <button
      className={styles.scrollToTops}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      style={{ opacity: isVisible ? "1" : "0" }}
    >
      <ArrowUpOutlined />
    </button>
  );
}

export default ScrollToTop;
