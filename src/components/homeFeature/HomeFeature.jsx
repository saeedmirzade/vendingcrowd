import styles from "./homeFeature.module.scss";

function HomeFeature({ featureData }) {
  return (
    <div className={styles.homeFeature}>
      {featureData.map((item, i) => {
        return (
          <div className={styles.homeFeature__item} key={i}>
            {item.icon}
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default HomeFeature;
