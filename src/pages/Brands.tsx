import { IBrands, IPagination } from "../interface/interface";
import PaginationComponent from "../components/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal, Form, Input } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const Brands: React.FC = () => {
  const [data, setData] = useState<{
    brands: IBrands[];
    pagination: IPagination;
  }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const fetchData = (page: number) => {
    axios
      .get(`/brand/list?page=${page}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          toast("Token is obsolete", { type: "error" });
          navigate("/admin/login");
        }
      });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleDeleteItem = async (itemId: number) => {
    try {
      await axios.delete(`/brand/delete/${itemId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setData((prevData: { brands: IBrands } | any) => ({
        ...prevData,
        brands: prevData!.brands.filter(
          (brand: IBrands) => brand.id !== itemId
        ),
      }));
    } catch (error: any) {
      toast(error.request, { type: "error" });
    } finally {
      toast("Item is deleted successfully!", { type: "success" });
    }
  };

  const handleAddItem = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(
        "/brand/add",
        {
          name_uz: values.name_uz,
          name_ru: values.name_ru,
          image: values.image,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setModalVisible(false);
      form.resetFields();
      toast("Item is added successfully!", { type: "success" });
      fetchData(currentPage);
    } catch (error) {
      toast("Failed to add item", { type: "error" });
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-11rem)] relative">
      <Button
        type="primary"
        className="bg-blue-600"
        onClick={() => setModalVisible(true)}
      >
        ADD
      </Button>
      {data && (
        <div className="">
          <ul>
            {data.brands.map((brand, index: number) => (
              <div className="flex justify-between mb-2">
                <li key={index}> {brand.name_uz} </li>
                <div className="flex flex-row gap-2">
                  <Button type="text" className="bg-yellow-500">
                    <EditOutlined />
                  </Button>
                  <Button
                    type="default"
                    className="bg-red-500"
                    onClick={() => handleDeleteItem(brand.id)}
                  >
                    <CloseOutlined />
                  </Button>
                </div>
              </div>
            ))}
          </ul>
          <div>
            <PaginationComponent
              total={data.pagination.total}
              pageSize={data.pagination.per_page}
              current={currentPage}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      )}
      <Modal
        title="Add Item"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddItem}
      >
        <Form form={form}>
          <Form.Item
            name="name_uz"
            label="Name (Uzbek)"
            rules={[
              { required: true, message: "Please enter the name in Uzbek" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_ru"
            label="Name (Russian)"
            rules={[
              { required: true, message: "Please enter the name in Russian" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Brands;
