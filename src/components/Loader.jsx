import Lottie from "lottie-react";
import loadAnimation from "../assets/lottie/loader6.json";

const Loader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
    }}
  >
    <Lottie
      animationData={loadAnimation}
      loop={true}
      style={{ width: "30%", height: "50%" }}
    />
  </div>
);

export default Loader;
