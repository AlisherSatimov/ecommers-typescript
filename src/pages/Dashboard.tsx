import { FetchDataDashboard } from "../interface/interface";
import { useNavigate } from "react-router-dom";
import DashCard from "../components/DashCard";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Row, Spin } from "antd";
import axios from "axios";

const fetchData: Object = async (): Promise<FetchDataDashboard> => {
  const res = await axios.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return res.data;
};

const Dashboard: React.FC = () => {
  const { data, status } = useQuery<FetchDataDashboard>(
    ["categories"],
    fetchData
  );
  const navigate = useNavigate();

  if (status === "error") {
    toast("Token is obsolete", { type: "error" });
    navigate("/admin/login");
  }

  return (
    <div className="text-center">
      {status === "loading" && <Spin size="large" />}
      {status === "success" && (
        <Row gutter={16}>
          <DashCard title="Total Brands" value={data.totalBrands} />
          <DashCard title="Total Category" value={data.totalCategory} />
          <DashCard title="Total Income" value={data.totalIncome || 0} />
          <DashCard title="Total Orders" value={data.totalOrders} />
          <DashCard title="Total Products" value={data.totalProducts} />
          <DashCard title="Total Sales" value={data.totalSales} />
          <DashCard title="Total Users" value={data.totalUsers} />
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
