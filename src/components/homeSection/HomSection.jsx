import styles from "./homeSection.module.scss";
import { memo } from "react";
import PropTypes from "prop-types";
const HomeSection = memo(function HomeSection({
  img,
  text,
  navigate,
  children,
  order,
  title,
  shadow,
}) {
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
});
HomeSection.propTypes = {
  img: PropTypes.string,
  text: PropTypes.string,
  navigate: PropTypes.string,
  children: PropTypes.node,
  order: PropTypes.number,
  title: PropTypes.string,
  shadow: PropTypes.string,
};

export default HomeSection;
