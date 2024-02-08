import { IBrands, IPagination } from "../interface/interface";
import PaginationComponent from "../components/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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

  return (
    <div className="w-full h-[calc(100vh-11rem)] relative">
      {data && (
        <div className="">
          <ul>
            {data.brands.map((brand, index: number) => (
              <li key={index}>{brand.name_uz}</li>
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
