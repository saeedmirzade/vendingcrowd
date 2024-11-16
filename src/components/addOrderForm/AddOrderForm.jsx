import { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  TimePicker,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./addOrderForm.module.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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
const machineList = ["Machine 1", "Machine 2", "Machine 3"];
const { Option } = Select;
const defaultValues = {
  location: null,
  machine: null,
  image: null,
  workOrderType: null,
  products: [],
  collectCash: null,
  taskTime: null,
  workDate: null,
  startTime: null,
  endTime: null,
  instructions: "",
  OrderPrice: "",
  status: null,
};
const initial = {
  id: 1234,
  location: "California",
  machine: "Snack Machine 1",
  image: "/images/address/vending.jpg",
  workOrderType: "restock",
  products: ["Soda", "Chips"],
  collectCash: "Yes",
  taskTime: "2 hours",
  workDate: dayjs("2024-11-06"),
  startTime: dayjs().hour(9).minute(0),
  endTime: dayjs().hour(11).minute(0),
  instructions: "Check for expired items.",
  status: "Progressing",
  OrderPrice: "$35",
};
function AddOrderForm({ id }) {
  const navigator = useNavigate();
  const initialValues = useMemo(() => (id ? initial : defaultValues), [id]);
  const [fileList, setFileList] = useState([]);
  const [workOrderType, setWorkOrderType] = useState(
    initialValues?.workOrderType
  );

  useEffect(() => {
    if (id) {
      setFileList([
        {
          uid: "-1",
          name: "vending machine",
          status: "done",
          url: initial.image,
        },
      ]);
    }
  }, [id]);

  const handleFileListChange = useCallback(
    ({ fileList }) => setFileList(fileList),
    []
  );

  const handleSubmit = useCallback(() => {
    message.success("Order Has been Sent Successfully");

    navigator("/dashboard/history");
  }, [navigator]);
  const renderOptions = (options) =>
    options.map((option) => (
      <Option key={option} value={option.toLowerCase()}>
        {option}
      </Option>
    ));
  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      className={styles.addOrderForm}
      initialValues={initialValues}
    >
      <div className={styles.addOrderForm__row}>
        <Form.Item
          style={{ flex: "1" }}
          label="Select Location"
          name="location"
          rules={[{ required: true, message: "Please select a location" }]}
        >
          <Select placeholder="Select a location">
            {renderOptions(states)}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ flex: "1" }}
          label="Select The Machine"
          name="machine"
          rules={[{ required: true, message: "Please select a machine" }]}
        >
          <Select placeholder="Select a machine">
            {renderOptions(machineList)}
          </Select>
        </Form.Item>
      </div>
      <Form.Item label="Upload Image of Machine" name="image">
        <Upload
          name="file"
          listType="picture"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleFileListChange}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <div className={styles.addOrderForm__row}>
        <Form.Item
          label="Work Order Type"
          name="workOrderType"
          rules={[
            { required: true, message: "Please select a work order type" },
          ]}
          style={{ flex: "1" }}
        >
          <Select
            placeholder="Select work order type"
            onSelect={(value) => setWorkOrderType(value)}
          >
            <Option value="restock">Restock</Option>
            <Option value="maintenance">Maintenance</Option>
            <Option value="restock-&-maintenance">Restock & Maintenance</Option>
            <Option value="maintenance-assessment">
              Maintenance Assessment
            </Option>
          </Select>
        </Form.Item>

        {workOrderType === "restock" ? (
          <Form.Item
            label="Select Products to Restock"
            name="products"
            style={{ flex: "1" }}
          >
            <Select mode="multiple" placeholder="Select products">
              {["Product A", "Product B", "Product C"].map((product) => (
                <Option key={product} value={product.toLowerCase()}>
                  {product}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}
      </div>
      <div className={styles.addOrderForm__row}>
        <Form.Item
          style={{ flex: "1" }}
          label="Should We Collect Cash for Deposit?"
          name="collectCash"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select placeholder="Yes or No">
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          style={{ flex: "1" }}
          label="How Much Time Will This Task Take"
          name="taskTime"
          rules={[{ required: true, message: "Please select task duration" }]}
        >
          <Select placeholder="Select task duration">
            {Array.from({ length: 16 }, (_, i) => (
              <Option key={i} value={`${(i / 2 + 1).toFixed(1)} hours`}>
                {(i / 2 + 1).toFixed(1)} hours
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        label="Date You Would Like The Work Done"
        name="workDate"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker />
      </Form.Item>

      <div className={styles.addOrderForm__row}>
        <Form.Item
          name="startTime"
          rules={[{ required: true, message: "Please select a start time" }]}
          style={{ display: "inline-block", width: "40%" }}
        >
          <TimePicker placeholder="Start Time" format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="endTime"
          rules={[{ required: true, message: "Please select an end time" }]}
          style={{ display: "inline-block", width: "40%" }}
        >
          <TimePicker placeholder="End Time" format="HH:mm" />
        </Form.Item>
      </div>

      <Form.Item label="Special Instructions" name="instructions">
        <Input.TextArea rows={3} placeholder="Any additional instructions" />
      </Form.Item>
      <div className={styles.addOrderForm__row}>
        <Form.Item label="Order Price" name="OrderPrice">
          <span className={styles.addOrderForm__span}>$35</span>
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

AddOrderForm.propTypes = {
  id: PropTypes.string,
};
export default AddOrderForm;
