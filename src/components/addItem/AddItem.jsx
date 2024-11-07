import styles from "./addItem.module.scss";
import { useState } from "react";
import { Modal, Button, Input, Upload, Form } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

function AddItem({ open, setOpen }) {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    name: "",
    image: null,
    ware1: 0,
    ware2: 0,
    ware3: 0,
  });
  const handleUploadChange = (file) => {
    const previewUrl = URL.createObjectURL(file);
    setData({ ...data, image: previewUrl });
    return false;
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);

    setOpen(false);
    form.resetFields();
    setData({ ...data, image: null });
  };

  return (
    <Modal
      title="Add New Product"
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
        setData({ ...data, image: null });
      }}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          itemName: data.name,
          warehouse1: data.ware1,
          warehouse2: data.ware2,
          warehouse3: data.ware3,
        }}
      >
        <Form.Item
          label="Item Name"
          name="itemName"
          rules={[{ required: true, message: "Please input the item name!" }]}
        >
          <Input onChange={(e) => setData({ ...data, name: e.target.value })} />
        </Form.Item>

        <Form.Item label="Product Picture">
          <Upload
            name="file"
            beforeUpload={handleUploadChange}
            showUploadList={false}
          >
            {!data.image && (
              <Button
                className={styles.addItem__upload}
                icon={<UploadOutlined />}
              ></Button>
            )}
            {data.image && (
              <div className={styles.addItem__previewContainer}>
                <img
                  src={data.image}
                  alt="Uploaded preview"
                  className={styles.addItem__previewImage}
                />
              </div>
            )}
          </Upload>
          {data.image && (
            <div className={styles.addItem__buttonContainer}>
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => setData({ ...data, image: null })}
                danger
              ></Button>
            </div>
          )}
        </Form.Item>

        <h3 className={styles.addItem__inventoryTitle}>Warehouse Inventory</h3>

        <Form.Item label="Warehouse 1" name="warehouse1">
          <Input
            type="number"
            onChange={(e) => setData({ ...data, ware1: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Warehouse 2"
          name="warehouse2"
          onChange={(e) => setData({ ...data, ware2: e.target.value })}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Warehouse 3"
          name="warehouse3"
          onChange={(e) => setData({ ...data, ware2: e.target.value })}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddItem;
