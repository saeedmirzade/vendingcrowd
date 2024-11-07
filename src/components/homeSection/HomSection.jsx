import { useNavigate } from "react-router-dom";
import styles from "./homeSection.module.scss";
function HomSection({ img, text, navigate, children, order, title, shadow }) {
  const navigator = useNavigate();
  return (
    <div
      className={styles.homeSection}
      style={{ boxShadow: `0 0 24px ${shadow}` }}
    >
      <div className={styles.homeSection__image} style={{ order: order }}>
        <img src={img} alt={`${navigate} banner`} />
      </div>
      <div className={styles.homeSection__text}>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </div>
  );
}

export default HomSection;
