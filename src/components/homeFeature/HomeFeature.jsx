import styles from "./homeFeature.module.scss";
import { memo } from "react";

const HomeFeature = memo(({ featureData }) => (
  <div className={styles.homeFeature}>
    {featureData.map((item, i) => (
      <div className={styles.homeFeature__item} key={i}>
        {item.icon}
        <h2>{item.title}</h2>
        <p>{item.text}</p>
      </div>
    ))}
  </div>
));
HomeFeature.displayName = "HomeFeature";
export default HomeFeature;
