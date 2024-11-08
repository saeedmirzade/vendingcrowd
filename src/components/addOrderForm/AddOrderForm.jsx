import { useEffect, useState, useCallback } from "react";
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
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./addOrderForm.module.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";
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

function AddOrderForm({
  orderPop,
  setOrderPop,
  setAddVending,
  initial,
  setInitial,
}) {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(defaultValues);

  const [fileList, setFileList] = useState([]);
  const [showRestock, setShowRestock] = useState(false);
  useEffect(() => {
    setFormValues(initial || defaultValues);
    form.setFieldsValue(initial || defaultValues);
    if (initial && initial.id) {
      setFileList([
        {
          uid: "-1",
          name: "vending machine",
          status: "done",
          url: initial.image,
        },
      ]);
      setShowRestock(initial.workOrderType.includes("Restock"));
    }
  }, [initial, form]);
  const handleFieldChange = useCallback((name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleFileListChange = useCallback(
    ({ fileList }) => setFileList(fileList),
    []
  );

  const handleWorkOrderTypeChange = useCallback(
    (value) => {
      handleFieldChange("workOrderType", value);
      setShowRestock(value.includes("restock"));
    },
    [handleFieldChange]
  );

  const handleCancel = useCallback(() => {
    form.resetFields();
    setOrderPop(false);
    if (initial) setInitial(defaultValues);
    setFormValues(defaultValues);
  }, [form, setOrderPop, initial, setInitial]);

  const handleSubmit = useCallback(() => {
    message.success("Order Has been Sent Successfully");
    handleCancel();
    navigator("/dashboard/history");
  }, [navigator, handleCancel]);

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
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className={styles.addOrderForm}
      >
        <div className={styles.addOrderForm__row}>
          <Form.Item
            style={{ flex: "1" }}
            label="Select Location"
            name="location"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a location"
              onChange={(value) => handleFieldChange("location", value)}
            >
              {states.map((state) => (
                <Option key={state} value={state.toLowerCase()}>
                  {state}
                </Option>
              ))}
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
              onChange={(value) => handleFieldChange("machine", value)}
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
              onChange={handleWorkOrderTypeChange}
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

          {showRestock && (
            <Form.Item
              label="Select Products to Restock"
              name="products"
              style={{ flex: "1" }}
            >
              <Select
                mode="multiple"
                placeholder="Select products"
                onChange={(value) => handleFieldChange("products", value)}
              >
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
            <Select
              placeholder="Yes or No"
              onChange={(value) => handleFieldChange("collectCash", value)}
            >
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
            <Select
              placeholder="Select task duration"
              onChange={(value) => handleFieldChange("taskTime", value)}
            >
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
          <DatePicker
            value={formValues.workDate ? moment(formValues.workDate) : null}
            onChange={(date) =>
              setFormValues({
                ...formValues,
                workDate: date ? date.toDate() : null,
              })
            }
          />
        </Form.Item>

        <div className={styles.addOrderForm__row}>
          <Form.Item
            name="startTime"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "48%" }}
          >
            <TimePicker
              value={
                formValues.startTime
                  ? moment(formValues.startTime, "HH:mm")
                  : null
              }
              onChange={(time) =>
                handleFieldChange(
                  "startTime",
                  time ? moment(time).format("HH:mm") : null
                )
              }
              placeholder="Start Time"
              format="HH:mm"
            />
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
            <TimePicker
              value={
                formValues.endTime ? moment(formValues.endTime, "HH:mm") : null
              }
              onChange={(time) =>
                handleFieldChange("endTime", time ? moment(time) : null)
              }
              placeholder="End Time"
              format="HH:mm"
            />
          </Form.Item>
        </div>

        <Form.Item label="Special Instructions" name="instructions">
          <Input.TextArea
            rows={3}
            value={formValues.instructions}
            onChange={(e) => handleFieldChange("instructions", e.target.value)}
            placeholder="Any additional instructions"
          />
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

export default AddOrderForm;
