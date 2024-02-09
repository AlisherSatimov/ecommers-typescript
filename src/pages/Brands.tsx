import { IBrands, IPagination } from "../interface/interface";
import PaginationComponent from "../components/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal } from "antd";

const Brands: React.FC = () => {
  const [data, setData] = useState<{
    brands: IBrands[];
    pagination: IPagination;
  }>();
  const [currentPage, setCurrentPage] = useState(1);
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

  const deleteItem = async (itemId: number) => {
    try {
      await axios.delete(`/brand/delete/${itemId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      // O'chirilgan elementni data ob'ektidan o'chirib tashlash
      setData(
        (prevData: { brands: IBrands; pagination: IPagination } | any) => ({
          ...prevData,
          brands: prevData!.brands.filter(
            (brand: IBrands) => brand.id !== itemId
          ),
        })
      );
    } catch (error: any) {
      toast(error.request, { type: "error" });
    } finally {
      toast("Item is deleted successfully!", { type: "success" });
    }
  };

  return (
    <div className="w-full h-[calc(100vh-11rem)] relative">
      {data && (
        <div className="">
          <ul>
            {data.brands.map((brand, index: number) => (
              <li key={index}>
                {brand.name_uz}
                <Button
                  type="default"
                  className="bg-red-500"
                  onClick={() => deleteItem(brand.id)}
                >
                  X
                </Button>
              </li>
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
    </div>
  );
};

export default Brands;
