import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  TimePicker,
  Upload,
  message,
} from "antd";
import PropTypes from "prop-types";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./addOrderForm.module.scss";
import { useNavigate } from "react-router-dom";

import { useForm } from "antd/es/form/Form";
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
};

function AddOrderForm({ orderPop, setOrderPop, setAddVending, initial }) {
  const navigator = useNavigate();
  const form = useForm();
  const initialValues = useMemo(() => initial ?? defaultValues, [initial]);
  const [workOrderType, setWorkOrderType] = useState(
    initialValues.workOrderType || ""
  );
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (initial && initial.id) {
      setFileList([
        {
          uid: "-1",
          name: "vending machine",
          status: "done",
          url: initial.image,
        },
      ]);
    }
  }, [initial]);

  const handleFileListChange = useCallback(
    ({ fileList }) => setFileList(fileList),
    []
  );

  const handleCancel = useCallback(() => {
    setOrderPop(false);
  }, [setOrderPop]);

  const handleSubmit = useCallback(() => {
    message.success("Order Has been Sent Successfully");
    handleCancel();
    navigator("/dashboard/history");
  }, [navigator, handleCancel]);
  const renderOptions = (options) =>
    options.map((option) => (
      <Option key={option} value={option.toLowerCase()}>
        {option}
      </Option>
    ));
  return (
    <Modal
      title="Add New Order"
      open={orderPop}
      onCancel={handleCancel}
      okText="Submit"
      onOk={() => form.submit()}
      width={window.innerWidth < 700 ? "80vw" : "60vw"}
      style={{ top: "20px" }}
    >
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
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a location">
              {renderOptions(states)}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ flex: "1" }}
            label="Select The Machine"
            name="machine"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a machine"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setOrderPop(false);
                      setAddVending(true);
                    }}
                  >
                    Add New Machine
                  </Button>
                </>
              )}
            >
              {machineList.map((machine) => (
                <Option key={machine} value={machine.toLowerCase()}>
                  {machine}
                </Option>
              ))}
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
            rules={[{ required: true }]}
            style={{ flex: "1" }}
          >
            <Select
              placeholder="Select work order type"
              onSelect={(e) => setWorkOrderType(e.target.value)}
            >
              <Option value="restock">Restock</Option>
              <Option value="maintenance">Maintenance</Option>
              <Option value="restock-&-maintenance">
                Restock & Maintenance
              </Option>
              <Option value="maintenance-assessment">
                Maintenance Assessment
              </Option>
            </Select>
          </Form.Item>

          {workOrderType.includes("restock") && (
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
          )}
        </div>
        <div className={styles.addOrderForm__row}>
          <Form.Item
            style={{ flex: "1" }}
            label="Should We Collect Cash for Deposit?"
            name="collectCash"
            rules={[{ required: true }]}
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
            rules={[{ required: true }]}
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
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>

        <div className={styles.addOrderForm__row}>
          <Form.Item
            name="startTime"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "48%" }}
          >
            <TimePicker placeholder="Start Time" format="HH:mm" />
          </Form.Item>
          <span
            style={{
              display: "inline-block",
              width: "4%",
              textAlign: "center",
            }}
          >
            to
          </span>
          <Form.Item
            name="endTime"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "48%" }}
          >
            <TimePicker placeholder="End Time" format="HH:mm" />
          </Form.Item>
        </div>

        <Form.Item label="Special Instructions" name="instructions">
          <Input.TextArea rows={3} placeholder="Any additional instructions" />
        </Form.Item>
        <Form.Item label="" name="OrderPrice">
          <p>
            Price : <strong>$35</strong>
          </p>
        </Form.Item>
      </Form>
    </Modal>
  );
}
AddOrderForm.propTypes = {
  orderPop: PropTypes.bool,
  setOrderPop: PropTypes.func,
  setAddVending: PropTypes.func,
  initial: PropTypes.object,
};

export default AddOrderForm;
