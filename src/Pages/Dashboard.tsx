import axios from "axios";
import { useQuery } from "react-query";

const fetchData: Object = async () => {
  const res = await axios.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return res.data;
};

const Dashboard: React.FC = () => {
  const { data, status } = useQuery("categories", fetchData);

  return (
    <div className="App">
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div>
          {data.topBrands.map((brand) => (
            <p key={brand.id}>{brand.name_uz}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
