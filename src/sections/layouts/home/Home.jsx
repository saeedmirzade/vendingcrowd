import { useState, useCallback } from "react";
import Navigation from "../../../components/navigation/Navigation";
import HomSection from "../../../components/homeSection/HomSection";
import { useNavigate } from "react-router-dom";
import HomeFeature from "../../../components/homeFeature/HomeFeature";
import Footer from "../../../components/footer/Footer";
import {
  CarryOutOutlined,
  CheckCircleOutlined,
  IssuesCloseOutlined,
  SafetyOutlined,
  SyncOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import AddOrderForm from "../../../components/addOrderForm/AddOrderForm";
import AddVedingForm from "../../../components/addVendingForm/AddVedingForm";
import ScrollToTop from "../../../components/scrollToTop/ScrollToTop";

const featureData = [
  {
    icon: <TruckOutlined />,
    title: "Machine Transport",
    text: "Need to move your vending machine from one location to another? Not a problem. Our network of logistics professionals will help you get the job done.",
  },
  {
    icon: <CheckCircleOutlined />,
    title: "Inventory Restocking",
    text: "Whether it’s on-demand or on a set schedule, ensure your machines will remain fully stocked.",
  },
  {
    icon: <CarryOutOutlined />,
    title: "Inventory Storage",
    text: "All of the products needed to restock your machines will be held at keyholder locations strategically positioned close to your machines.",
  },
];
const secondFeature = [
  {
    icon: <SafetyOutlined />,
    title: "Keyholder Services",
    text: "Our Keyholders are a network of businesses local to your machines, and provide inventory storage, vending machine key holding, and deposit collection services. Keyholders enable us to deploy attendants more quickly and efficiently to complete your work order requests.",
  },
  {
    icon: <IssuesCloseOutlined />,
    title: "Maintenance Assessment",
    text: "When you receive a complaint that one of your vending machines isn’t working, but you don’t know what is wrong, you can deploy one of our attendants to investigate the issue and report back to you with what’s wrong.",
  },
  {
    icon: <SyncOutlined />,
    title: "Maintenance Services",
    text: "Whether it’s a coin jam, credit card reader replacement, compressor fix, or an upgraded board, our attendants are highly trained to address all of your vending machine maintenance needs.",
  },
];
const homeData = [
  {
    img: "/images/background/home1.png",
    text: "VendingCrowd is like Instacart, but for vending machine operators! Remotely dispatch our fleet of vending machine attendants to handle everything from machine transports,to restocks, repairs, and even cash collection and deposits.",
    navigate: "order",
    order: 1,
    title: "The Instacart of Vending Machine Operations.",
  },
  {
    img: "/images/background/home2.png",
    text: "With VendingCrowd, you can easily check your inventory directly from the dashboard. Stay informed about stock levels and make data-driven decisions to enhance your vending operations.",
    navigate: "dashboard",
    order: 0,
    title: "Check Your Inventory in the Dashboard.",
  },
  {
    img: "/images/background/home3.png",
    text: "Adding a new vending machine has never been easier with VendingCrowd. Our intuitive platform allows you to quickly set up and manage your machines, expanding your reach effortlessly.",
    navigate: "add-machine",
    order: 1,
    title: "Easily Add New Vending Machines.",
  },
];

function Home() {
  const [openOrder, setOpenOrder] = useState(false);
  const [addVending, setAddVending] = useState(false);
  const navigator = useNavigate();

  const handleSetOpenOrder = useCallback(() => setOpenOrder(true), []);
  const handleSetAddVending = useCallback(() => setAddVending(true), []);

  return (
    <>
      <Navigation />
      <HomSection
        img={homeData[0].img}
        text={homeData[0].text}
        navigate={homeData[0].navigate}
        order={homeData[0].order}
        title={homeData[0].title}
      >
        <button onClick={handleSetOpenOrder}>Add Order Now</button>
      </HomSection>
      <HomeFeature featureData={secondFeature} />
      <HomSection
        img={homeData[1].img}
        text={homeData[1].text}
        navigate={homeData[1].navigate}
        order={homeData[1].order}
        title={homeData[1].title}
      >
        <button onClick={() => navigator("/dashboard")}>Check Inventory</button>
      </HomSection>
      <HomeFeature featureData={featureData} />
      <HomSection
        img={homeData[2].img}
        text={homeData[2].text}
        navigate={homeData[2].navigate}
        order={homeData[2].order}
        title={homeData[2].title}
      >
        <button onClick={handleSetAddVending}>Add New Vending Machine</button>
      </HomSection>
      <AddOrderForm
        orderPop={openOrder}
        setOrderPop={setOpenOrder}
        setAddVending={setAddVending}
      />
      <AddVedingForm
        vendingOpen={addVending}
        setVendingOpen={setAddVending}
        inisial={{
          warehouse: "",
          address: "",
          machineName: "",
          machineColor: "",
          state: null,
          postalCode: "",
          additionalNote: "",
          addressNote: "",
          id: "",
          img: "",
        }}
      />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default Home;
