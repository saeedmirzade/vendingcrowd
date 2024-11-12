import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Form, Input, Select, ColorPicker, Modal, Upload, Button } from "antd";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./addVendingForm.module.scss";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const stateCoordinates = [
  [32.806671, -86.79113], // Alabama
  [61.370716, -152.404419], // Alaska
  [34.969704, -111.431221], // Arizona
  [34.969704, -92.373123], // Arkansas
  [36.778259, -119.417931], // California
  [39.550051, -105.782066], // Colorado
  [41.603221, -73.087749], // Connecticut
  [39.158034, -75.524368], // Delaware
  [27.994402, -81.760254], // Florida
  [32.165623, -82.900078], // Georgia
  [21.094318, -157.498337], // Hawaii
  [44.068203, -114.742043], // Idaho
  [40.633125, -89.398529], // Illinois
  [40.551217, -85.602364], // Indiana
  [41.878003, -93.097702], // Iowa
  [39.011902, -98.484246], // Kansas
  [37.839333, -84.27002], // Kentucky
  [31.169546, -91.867805], // Louisiana
  [45.253783, -69.445469], // Maine
  [39.045753, -76.641273], // Maryland
  [42.407211, -71.382439], // Massachusetts
  [44.314844, -85.602364], // Michigan
  [46.729553, -94.685898], // Minnesota
  [32.354668, -89.398528], // Mississippi
  [37.964253, -91.831833], // Missouri
  [46.879682, -110.362566], // Montana
  [41.492537, -99.901813], // Nebraska
  [38.802611, -116.419389], // Nevada
  [43.193852, -71.572395], // New Hampshire
  [40.058324, -74.405661], // New Jersey
  [34.51994, -105.87009], // New Mexico
  [43.299428, -74.217933], // New York
  [35.759573, -79.0193], // North Carolina
  [47.551493, -101.002012], // North Dakota
  [40.417287, -82.907123], // Ohio
  [35.007752, -97.092877], // Oklahoma
  [43.804133, -120.554201], // Oregon
  [41.203322, -77.194525], // Pennsylvania
  [41.580095, -71.477429], // Rhode Island
  [33.836081, -81.163725], // South Carolina
  [43.969515, -99.901813], // South Dakota
  [35.517491, -86.580447], // Tennessee
  [31.968599, -99.901813], // Texas
  [39.32098, -111.093731], // Utah
  [44.558803, -72.577841], // Vermont
  [37.431573, -78.656894], // Virginia
  [47.751074, -120.740139], // Washington
  [38.597626, -80.454903], // West Virginia
  [43.78444, -88.787868], // Wisconsin
  [43.075968, -107.290284], // Wyoming
];

const defaultIcon = new L.Icon({
  iconUrl: iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const inisial = {
  id: "1234",
  img: "/images/address/vending.jpg",
  warehouse: "Warehouse1",
  machineName: "Healthy Snacks Machine",
  machineColor: "Green",
  state: "California",
  address: "456 Wellness Blvd",
  postalCode: "90210",
  additionalNote: "Restock weekly with organic snacks.",
  addressNote: "Located near the main entrance.",
  locationCoordinates: {
    lat: 34.0522,
    lng: -118.2437,
  },
};
const defaultValue = {
  id: "",
  img: "",
  warehouse: "",
  machineName: "",
  machineColor: "",
  state: "",
  address: "",
  postalCode: "",
  additionalNote: "",
  addressNote: "",
  locationCoordinates: {
    lat: "",
    lng: "",
  },
};
function AddVendingForm({ vendingOpen, setVendingOpen, id }) {
  const formValues = useMemo(() => (id ? inisial : defaultValue), [id]);
  const [mapkey, setMapkey] = useState(0);
  const [mapCenter, setMapCenter] = useState(
    id
      ? stateCoordinates[states.indexOf(formValues.state)]
      : [37.0902, -95.7129]
  );

  const [markerPosition, setMarkerPosition] = useState(null);

  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleStateChange = useCallback(
    (value) => {
      form.setFieldsValue({ warehouse: "Loading..." });
      setTimeout(() => {
        form.setFieldsValue({ warehouse: "Warehouse 1" });
      }, 1000);
      const coorts = value.charAt(0).toUpperCase() + value.slice(1);
      const newCenter = stateCoordinates[states.indexOf(coorts)];
      setMapCenter(newCenter);
      setMapkey((perv) => perv + 1);
    },
    [form]
  );

  useEffect(() => {
    if (id) {
      setFileList([
        {
          uid: "-1",
          name: "vending machine",
          status: "done",
          url: inisial.img,
        },
      ]);
      setMapCenter(stateCoordinates[states.indexOf(formValues.state)]);
    } else {
      setFileList([]);
    }
    setMapkey((perv) => perv + 1);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 400);

    form.setFieldsValue(formValues);
  }, [form, formValues.state, id, formValues]);
  useEffect(() => {
    if (formValues.locationCoordinates) {
      const { lat, lng } = formValues.locationCoordinates;
      setMarkerPosition([lat, lng]);
    }
  }, [formValues.locationCoordinates]);

  const fetchAddress = useCallback(
    async (lat, lng) => {
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: { lat, lon: lng, format: "json" },
          }
        );
        form.setFieldsValue({
          address: response.data.display_name || "Address not found",
        });
      } catch (error) {
        console.error("Error fetching address:", error);
        form.setFieldsValue({ address: "Error fetching address" });
      }
    },
    [form]
  );

  const LocationMarker = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]);
        if (!id) fetchAddress(lat, lng);
      },
    });
    return markerPosition ? (
      <Marker position={markerPosition} icon={defaultIcon} />
    ) : null;
  };

  const onClose = () => {
    setVendingOpen(false);
  };

  const handleSubmit = () => {
    setVendingOpen(false);
  };

  return (
    <Modal
      title="Add New Machine"
      open={vendingOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Comfirm"
      width={window.innerWidth < 700 ? "80svw" : "60svw"}
      style={{ top: "20px" }}
    >
      <Form
        layout="vertical"
        form={form}
        className={styles.addVendingForm}
        onFinish={handleSubmit}
        initialValues={formValues}
      >
        <div className={styles.addVendingForm__row}>
          <Form.Item
            label="Machine Name"
            style={{ flex: "1" }}
            rules={[{ required: true, message: "Machine Name is required" }]}
            name="machineName"
          >
            <Input placeholder="Displayed in Order Page" />
          </Form.Item>

          <Form.Item
            label="Machine Color"
            style={{ flex: "0.3" }}
            name="machineColor"
          >
            <ColorPicker />
          </Form.Item>
        </div>
        <div className={styles.addVendingForm__row}>
          <Form.Item
            label="State"
            style={{ flex: "0.3" }}
            name="state"
            rules={[{ required: true, message: "State is required" }]}
          >
            <Select
              placeholder="Select State"
              onSelect={handleStateChange}
              options={states.map((state) => ({
                label: state,
                value: state.toLowerCase(),
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Postal Code"
            style={{ flex: "0.3" }}
            name={"postalCode"}
          >
            <Input placeholder="Enter Postal Code" />
          </Form.Item>
        </div>
        <div className={styles.addVendingForm__row}>
          <Form.Item label="Warehouse" style={{ flex: "0.3" }} name="warehouse">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Upload Image of Machine"
            name="image"
            style={{ flex: "0.3" }}
          >
            <Upload
              name="file"
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item
          label="Address"
          style={{ flex: "1" }}
          name="address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input.TextArea
            placeholder="Select location on map to auto-fill this field"
            rows={2}
          />
        </Form.Item>
        <div className={styles.addVendingForm__row}>
          <Form.Item
            label="Additional Note (Only for You)"
            style={{ flex: "1" }}
            name="additionalNote"
          >
            <Input.TextArea placeholder="Enter notes" rows={3} />
          </Form.Item>
          <Form.Item
            label="Address Note (For Driver)"
            style={{ flex: "1" }}
            name="addressNote"
          >
            <Input.TextArea
              placeholder="Enter driver-specific instructions"
              rows={3}
            />
          </Form.Item>
        </div>
        <Form.Item label="Select Location on Map">
          <MapContainer
            key={mapkey}
            center={mapCenter}
            zoom={5}
            scrollWheelZoom={true}
            style={{
              height: "400px",
              width: "100%",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LocationMarker />
          </MapContainer>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddVendingForm;
