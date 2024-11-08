import { useState, useEffect, useCallback } from "react";
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

function AddVendingForm({ vendingOpen, setVendingOpen, inisial, setData }) {
  const [formValues, setFormValues] = useState(inisial);
  const [mapCenter, setMapCenter] = useState(
    stateCoordinates[states.indexOf(formValues.state)] || [37.0902, -95.7129]
  );
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const [fileList, setFileList] = useState(
    formValues.img
      ? [
          {
            uid: "-1",
            name: "vending machine",
            status: "done",
            url: formValues.img,
          },
        ]
      : []
  );
  const [form] = Form.useForm();

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleFieldChange = useCallback((name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);
  const handleStateChange = useCallback(
    (value) => {
      handleFieldChange("state", value);
      handleFieldChange("warehouse", "Loading...");
      setTimeout(() => handleFieldChange("warehouse", "Warehouse 1"), 1000);
      const coorts = value.charAt(0).toUpperCase() + value.slice(1);
      const newCenter = stateCoordinates[states.indexOf(coorts)];
      setMapCenter(newCenter);
    },
    [handleFieldChange]
  );
  useEffect(() => {
    setFormValues(inisial);
    form.setFieldsValue(inisial);
  }, [inisial, form]);

  useEffect(() => {
    if (formValues.state) {
      setMapKey((prevKey) => prevKey + 1);
    }
    if (formValues.locationCoordinates) {
      const { lat, lng } = formValues.locationCoordinates;
      setMarkerPosition([lat, lng]);
      setMapKey((prevKey) => prevKey + 1);
    }
  }, [formValues.state, formValues.locationCoordinates]);

  const fetchAddress = useCallback(
    async (lat, lng) => {
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: { lat, lon: lng, format: "json" },
          }
        );
        handleFieldChange(
          "address",
          response.data.display_name || "Address not found"
        );
      } catch (error) {
        console.error("Error fetching address:", error);
        handleFieldChange("address", "Error fetching address");
      }
    },
    [handleFieldChange]
  );

  const LocationMarker = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });
    return markerPosition ? (
      <Marker position={markerPosition} icon={defaultIcon} />
    ) : null;
  };

  const onClose = () => {
    form.resetFields();
    setMapCenter([37.0902, -95.7129]);
    setMapKey((prevKey) => prevKey + 1);
    setVendingOpen(false);
    setFormValues({
      warehouse: "",
      address: "",
      machineName: "",
      machineColor: "",
      state: null,
      postalCode: "",
      additionalNote: "",
      addressNote: "",
      locationCoordinates: {
        lat: "",
        lng: "",
      },
      id: "",
      img: "",
    });
    if (setData)
      setData({
        warehouse: "",
        address: "",
        machineName: "",
        machineColor: "",
        state: null,
        postalCode: "",
        additionalNote: "",
        addressNote: "",
        locationCoordinates: {
          lat: "",
          lng: "",
        },
        id: "",
        img: "",
      });
    setMarkerPosition(null);
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
        initialValues={inisial}
      >
        <div className={styles.addVendingForm__row}>
          <Form.Item
            label="Machine Name"
            style={{ flex: "1" }}
            rules={[{ required: true, message: "Machine Name is required" }]}
            name="machineName"
          >
            <Input
              value={formValues.machineName}
              onChange={(e) => handleFieldChange("machineName", e.target.value)}
              placeholder="Displayed in Order Page"
            />
          </Form.Item>

          <Form.Item
            label="Machine Color"
            style={{ flex: "0.3" }}
            name="machineColor"
          >
            <ColorPicker
              value={formValues.machineColor}
              onChange={(color) => handleFieldChange("machineColor", color)}
            />
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
              value={formValues.state}
              options={states.map((state) => ({
                label: state,
                value: state.toLowerCase(),
              }))}
              onChange={handleStateChange}
            />
          </Form.Item>
          <Form.Item
            label="Postal Code"
            style={{ flex: "0.3" }}
            name={"postalCode"}
          >
            <Input
              value={formValues.postalCode}
              onChange={(e) => handleFieldChange("postalCode", e.target.value)}
              placeholder="Enter Postal Code"
            />
          </Form.Item>
        </div>
        <div className={styles.addVendingForm__row}>
          <Form.Item
            label="Warehouse"
            style={{ flex: "0.3" }}
            name={"warehouse"}
          >
            <Input value={formValues.warehouse} disabled />
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
          name={inisial.id ? "address" : undefined}
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input.TextArea
            value={formValues.address}
            onChange={(e) => handleFieldChange("address", e.target.value)}
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
            <Input.TextArea
              value={formValues.additionalNote}
              onChange={(e) =>
                handleFieldChange("additionalNote", e.target.value)
              }
              placeholder="Enter notes"
              rows={3}
            />
          </Form.Item>
          <Form.Item
            label="Address Note (For Driver)"
            style={{ flex: "1" }}
            name="addressNote"
          >
            <Input.TextArea
              value={formValues.addressNote}
              onChange={(e) => handleFieldChange("addressNote", e.target.value)}
              placeholder="Enter driver-specific instructions"
              rows={3}
            />
          </Form.Item>
        </div>
        <Form.Item label="Select Location on Map">
          <MapContainer
            key={mapKey}
            center={mapCenter}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
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
