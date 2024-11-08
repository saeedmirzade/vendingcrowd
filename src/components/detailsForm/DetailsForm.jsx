import styles from "./detailsForm.module.scss";
import { useState, useCallback, useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import debounce from "lodash/debounce";

const { Option } = Select;

function DetailsForm({ states }) {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(form.getFieldsValue());
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const checkChanges = useCallback(
    (allValues) => {
      const hasChanges = Object.keys(allValues).some(
        (key) => initialValues[key] !== allValues[key]
      );
      setIsSaveDisabled(!hasChanges);
    },
    [initialValues]
  );

  const handleValuesChange = debounce((_, allValues) => {
    checkChanges(allValues);
  }, 300);

  const handleSave = () => {
    message.success("Changes saved");
    setIsSaveDisabled(true);
    setInitialValues(form.getFieldsValue());
  };

  return (
    <>
      <h2 className={styles.detailsForm__head}>Pesonal Information</h2>
      <Form
        form={form}
        layout="vertical"
        className={styles.detailsForm}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
      >
        <div className={styles.detailsForm__row}>
          <Form.Item style={{ flex: 1 }} label="First Name" name="firstName">
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item style={{ flex: 1 }} label="Last Name" name="lastName">
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            label="Phone Number"
            name="phoneNumber"
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            label="Email"
            name="email"
            rules={[{ type: "email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
        </div>
        <div className={styles.detailsForm__row}>
          <Form.Item
            style={{ flex: 1 }}
            label="Company Name"
            name="companyName"
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            label="Company Phone Number"
            name="companyPhoneNumber"
          >
            <Input placeholder="Enter company phone number" />
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            label="Company Website"
            name="companyWebsite"
          >
            <Input placeholder="Enter company website" />
          </Form.Item>
          <Form.Item
            label="Company Zip Code"
            name="companyZipCode"
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter company zip code" />
          </Form.Item>
        </div>
        <div className={styles.detailsForm__row}>
          <Form.Item label="Company State" name="companyState">
            <Select placeholder="Select company state">
              {states.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Company City" name="companyCity">
            <Input placeholder="Enter company city" />
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            label="Company Address"
            name="companyAddress"
          >
            <Input placeholder="Enter company address" />
          </Form.Item>
        </div>
        <div className={styles.detailsForm__row}>
          <Form.Item
            label="How Many Machines Do You Manage?"
            name="machineCount"
            style={{ flex: 1 }}
          >
            <Select placeholder="Select machine count">
              <Option value="1-10">1-10</Option>
              <Option value="10-20">10-20</Option>
              <Option value="20-30">20-30</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            label="In What States Are Your Machines Located?"
            name="machineStates"
          >
            <Select mode="multiple" placeholder="Select states">
              {states.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ flex: 1 }}
            label="How Many Years Have You Been in Business?"
            name="businessYears"
          >
            <Select placeholder="Select years in business">
              {Array.from({ length: 50 }, (_, i) => (
                <Option key={i} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "year" : "years"}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" onClick={handleSave} disabled={isSaveDisabled}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DetailsForm;
